/*  
 *  Rubicon for Starfinder (sfrpg)
 *    Mostly compatible with Starfinder version 0.26.1
 *    Patches from theleruby/foundryvtt-sfrpg are required
 */

import { getItemContainer } from "/systems/sfrpg/module/actor/actor-inventory-utils.js";
import { SFRPG } from "/systems/sfrpg/module/config.js";
import { DiceSFRPG } from "/systems/sfrpg/module/dice.js";
import { ActorSheetSFRPG } from "/systems/sfrpg/module/actor/sheet/base.js";
import RollContext from "/systems/sfrpg/module/rolls/rollcontext.js";
import SFRPGModifier from "/systems/sfrpg/module/modifiers/modifier.js";
import StackModifiers from "/systems/sfrpg/module/rules/closures/stack-modifiers.js";
import {
    SFRPGEffectType,
    SFRPGModifierType,
    SFRPGModifierTypes
} from "/systems/sfrpg/module/modifiers/types.js";
import RubiconActions from "./actions.js";
import SpellDescriptions from "./spells.js";
import ConsumableDescriptions from "./consumables.js";
import QuickMenuOptions from "./menu.js";

export const RubiconConstants = {};
/*
RubiconConstants.defaultConsumables = [
  {
    "name": "Dye grenade 1",
    "icon": "icons/weapons/thrown/grenade-round.webp"
  },
  {
    "name": "Frag grenade I",
    "icon": "systems/sfrpg/icons/equipment/weapons/frag-grenade.webp"
  },
  {
    "name": "Shock grenade I",
    "icon": "systems/sfrpg/icons/equipment/weapons/shock-grenade.webp"
  },
  {
    "name": "Smoke grenade I",
    "icon": "systems/sfrpg/icons/equipment/weapons/smoke-grenade.webp"
  },
  {
    "name": "Stickybomb grenade I",
    "icon": "systems/sfrpg/icons/equipment/weapons/stickybomb-grenade.webp"
  },
  {
    "name": "Thasphalt grenade I",
    "icon": "systems/sfrpg/icons/equipment/weapons/incendiary-grenade.webp"
  },
  {
    "name": "Serum of Healing, Mk 1",
    "icon": "systems/sfrpg/icons/equipment/magic%20items/serum-of-healing.webp"
  }
]
*/

export class Rubicon extends Application {
  constructor () {
    super();
    Hooks.on("createItem", this._onItemChange.bind(this));
    Hooks.on("updateItem", this._onItemChange.bind(this));
    Hooks.on("deleteItem", this._onItemChange.bind(this));
    Hooks.on("updateActor", this._onActorChange.bind(this));
    Hooks.on("updateToken", this._onTokenChange.bind(this));
    //Hooks.on("onAfterUpdateCombat", this._onAfterUpdateCombat.bind(this));
    //Hooks.on("renderChatMessage", this._onRenderChatMessage.bind(this));
    this._actor = null;
    this._selectControlledToken();
    // the hooks are unreliable, so we're forced to just reselect the controlled token repeatedly.
    window.setInterval(() => { this._selectControlledToken(); }, 30);
    $(document).on('click', '.rubicon-chat-card-button', this._onButtonClick.bind(this));
    $(document).on('click', '.rubicon-hud-action-button', this._onHudActionClick.bind(this));
    this._availableActions = Object.assign({},
      RubiconActions.combatManeuvers,
      RubiconActions.specialAttacks,
      RubiconActions.defendActions,
      RubiconActions.movement,
      RubiconActions.acrSkill,
      RubiconActions.athSkill,
      RubiconActions.bluSkill,
      RubiconActions.intSkill,
      RubiconActions.medSkill,
      RubiconActions.sleSkill,
      RubiconActions.steSkill,
      RubiconActions.basic
    )
  }
  
  showDialogError(title, message) {
    const myDialog = new Dialog({
      title: title,
      content: `${message}<br/>&nbsp;`,
      default: "ok",
      buttons: {
        ok: { label: "OK", callback: ()=>{}, icon:''}
      }
    }).render(true);
  }
  
  showDialogQuickSkillCheck(actor) {
    if (!actor) {
        return this.showDialogError("Error", "No target");
    }
    let buttons = {};
    let skillTargets = ["acr", "med", "ath", "mys", "blu", "per", "com", "pro", "cul", "phs", "dip", "pil", "dis", "sen", "eng", "sle", "int", "ste", "lsc", "sur"];
    let index = 0;
    for (const [a, key] of Object.entries(skillTargets)) {
      let skill = actor.system.skills[key];
      let label = CONFIG.SFRPG.skills[key];
      if (skill.ranks == 0 && skill.isTrainedOnly) {
          label += " <b>(untrained)</b>";
      }
      if (skill.mod != 0) {
        if (skill.mod > 0) {
            label += ` <span style='color:green;font-weight:bold;float:right;'>+${skill.mod}</span>`;
        } else if (skill.mod < 0) {
            label += ` <span style='color:red;font-weight:bold;float:right;'>${skill.mod}</span>`;
        }
      }
      label = label.replace(" ","&nbsp;");
      buttons[key] = {
        label: label,
        callback: () => {actor.rollSkill(key);},
        icon: ``
      };
    }
    const myDialog = new Dialog({
        title: "Quick Skill Check",
        content: `<b>${actor.name}</b><br/>Select a skill to roll.`,
        buttons: buttons
    }, {id: "rubiconQuickSkillCheckDialog"}).render(true);
  }
  
  showDialogQuickAbilityCheck(actor) {
    if (!actor) {
        return this.showDialogError("Error", "No target");
    }
    let buttons = {};
    let skillTargets = ["str", "dex", "con", "int", "wis", "cha"];
    let index = 0;
    for (const [a, key] of Object.entries(skillTargets)) {
      let skill = actor.system.abilities[key];
      let label = CONFIG.SFRPG.abilities[key];
      if (skill.mod != 0) {
        if (skill.mod > 0) {
            label += ` <span style='color:green;font-weight:bold;float:right;'>+${skill.mod}</span>`;
        } else if (skill.mod < 0) {
            label += ` <span style='color:red;font-weight:bold;float:right;'>${skill.mod}</span>`;
        }
      }
      label = label.replace(" ","&nbsp;");
      buttons[key] = {
        label: label,
        callback: () => {actor.rollAbility(key);},
        icon: ``
      };
    }
    const myDialog = new Dialog({
        title: "Quick Ability Check",
        content: `<b>${actor.name}</b><br/>Select an ability to roll.`,
        buttons: buttons
    }, {id: "rubiconQuickAbilityCheckDialog"}).render(true);
  }
  
  showDialogQuickSave(actor) {
    if (!actor) {
        return this.showDialogError("Error", "No target");
    }
    let buttons = {};
    let skillTargets = ["fort", "reflex", "will"];
    let index = 0;
    for (const [a, key] of Object.entries(skillTargets)) {
      let skill = actor.system.attributes[key];
      let label = CONFIG.SFRPG.saves[key];
      let skillMod = skill.bonus;
      if (skillMod != 0) {
        if (skillMod > 0) {
            label += ` <span style='color:green;font-weight:bold;float:right;'>+${skillMod}</span>`;
        } else if (skillMod < 0) {
            label += ` <span style='color:red;font-weight:bold;float:right;'>${skillMod}</span>`;
        }
      }
      label = label.replace(" ","&nbsp;");
      buttons[key] = {
        label: label,
        callback: () => {actor.rollSave(key);},
        icon: ``
      };
    }
    const myDialog = new Dialog({
        title: "Quick Save",
        content: `<b>${actor.name}</b><br/>Select a save to roll.`,
        buttons: buttons
    }, {id: "rubiconQuickAbilityCheckDialog"}).render(true);
  }
  
  showDialogQuickRollableTable(actor) {
    if (!actor) {
        return this.showDialogError("Error", "No target");
    }
    let buttons = {};
    for (const rollTable of game.tables) {
      buttons[rollTable._id] = {
        label: rollTable.name,
        callback: () => {rollTable.draw();},
        icon: `<img src="${rollTable.img}" />`,
      };
    }
    const myDialog = new Dialog({
        title: "Quick Rollable Table",
        content: `<b>${actor.name}</b><br/>Select a table to roll against.`,
        buttons: buttons
    }, {id: "rubiconQuickActionDialog__rollableTable_"}).render(true);
  }
  
  showDialogQuickMenu(token) {
    this.showDialogQuick(token, QuickMenuOptions.full, "menu")
  }
  
  showDialogQuickAction(token) {
    this.showDialogQuick(token, QuickMenuOptions.skills, "action");
  }
  
  showDialogQuickBasicAttack(token) {
    this._showDialogQuickActionItem(token, "_basicAttack_");
  }
  
  showDialogQuickConsumable(token) {
    this._showDialogQuickActionItem(token, "_consumable_");
  }
  
  showDialogQuickReload(token) {
    this._showDialogQuickActionItem(token, "_reload_");
  }
  
  showDialogQuickEquip(token) {
    this.showDialogQuick(token, QuickMenuOptions.equip, "equip");
    //this._showDialogQuickActionItem(token, "_equip_");
  }
  
  showDialogQuickAltAttack(token) {
    this.showDialogQuick(token, QuickMenuOptions.altActions, "altAttack");
  }
  
  showDialogQuickMoveDefend(token) {
    this.showDialogQuick(token, QuickMenuOptions.moveDefend, "moveDefend");
  }
  
  showDialogQuickEquipReload(token) {
    this.showDialogQuick(token, QuickMenuOptions.equipReload, "equipReload");
  }
  
  showDialogQuickSpell(token) {
    this._showDialogQuickActionItem(token, "_basicSpell_");
  }
  
  showDialogQuickSpellIdentify(token) {
    this._showDialogQuickActionItem(token, "_identifySpell_");
  }
  
  showDialogQuickRoll(token) {
    this.showDialogQuick(token, QuickMenuOptions.quickRoll, "quickRoll");
  }
  
  dealDamageToToken(token) {
    if (!token) {
      return this.showDialogError("Error", "No target");
    }
    new Dialog({
      title: `Deal damage to ${token.name}`,
      content: `<form autocomplete="off"><div class="form-group"><label>Damage amount:</label><input type='text' name='inputField' data-button="apply" autofocus></input></div></form>`,
      buttons: {
        apply: {
          icon: "<i class='fas fa-check'></i>",
          label: `Apply Changes`,
          callback: function(html) {
            let result = html.find('input[name=\'inputField\']').val();
            var x = parseInt(result, 10);
            if (isNaN(x)) {
              return game.rubicon.showDialogError("Error", "Not a Number");
            }
            if (x < 1) {
              return game.rubicon.showDialogError("Error", "Input amount must be at least 1");
            }
            // reduce temporary hit points
            let thp = token.actor.system.attributes?.hp?.temp
            if (thp !== undefined && thp !== null && thp > 0) {
              if (thp > x) {
                thp = thp - x;
                x = 0;
              } else {
                x = x - thp;
                thp = 0;
              }
              token.actor.update({"system.attributes.hp.temp": thp});
            }
            // reduce stamina
            let sp = token.actor.system.attributes?.sp?.value
            if (sp !== undefined && sp !== null && sp > 0) {
              if (sp > x) {
                sp = sp - x;
                x = 0;
              } else {
                x = x - sp;
                sp = 0;
              }
              token.actor.update({"system.attributes.sp.value": sp});
            }
            // reduce health
            let hp = token.actor.system.attributes?.hp?.value
            if (hp !== undefined && hp !== null && hp > 0) {
              if (hp > x) {
                hp = hp - x;
                x = 0;
              } else {
                x = x - hp;
                hp = 0;
              }
              token.actor.update({"system.attributes.hp.value": hp});
            }
          }
        }
      }
    }).render(true);
  }
  
  showDialogQuick(token, entries, windowId) {
    if (!token) {
        return this.showDialogError("Error", "No target");
    }
    let buttons = {}
    for (const [opt, data] of Object.entries(entries)) {
      // do we require training. if so make sure we have it
      if (data.requireTraining) {
        let ranks = token.actor?.system?.skills[data.requireTraining]?.ranks
        if(ranks === undefined || ranks === null || ranks === 0) {
          // we need training so can't use this skill. skip over it completely.
          continue;
        }
      }
      let properties = data.properties.length > 0 ? `<span class="rubicon-button-property-block">${data.properties[0]}</span>` : "";
      buttons[opt] = {
        label: `
        <span>${data.name}</span>
        <span>${data.shortDescription}</span>
        ${properties}
        `,
        callback: () => {
          if (data.type === 0) {
            this._showDialogQuickActionEntry(token, opt)
          } else if (data.type === 1) {
            this._showDialogQuickActionItem(token, opt);
          } else if (data.type === 2) {
            this.showDialogQuickAction(token);
          } else if (data.type === 3) {
            this.showDialogQuickSkillCheck(token?.actor);
          } else if (data.type === 4) {
            this.showDialogQuickAbilityCheck(token?.actor);
          } else if (data.type === 5) {
            this.showDialogQuickSave(token?.actor);
          } else if (data.type === 6) {
            this.showDialogQuickRollableTable(token?.actor);
          } else {
            return this.showDialogError("Error", "Bad data type");
          }
        },
        icon: `<img src="${data.img}" />`
      }
    };
    const myDialog = new Dialog({
      title: `Quick Action`,
      content: `<b>${token.actor.name}</b><br/>Select an action type.`,
      buttons: buttons
    }, {id: `rubiconQuickActionDialog_groupSelection_${windowId}`, options: {height: 600}}).render(true); // height is max height to expand to
  }
  
  _getItemsWithAmmoType(actor, ammunitionType) {
    return actor.items
      .filter(x => x.type === "ammunition" && x.system.ammunitionType === ammunitionType)
      .filter(x => {
          const container = getItemContainer(actor.items, x);
          return !container || container.type === "container";
      });
  }
  
  // based on item-capacity.js line 123
  _getItemRemainingAmmo(item) {
    if (item.requiresCapacityItem()) {
      const currentCapacity = item.getCurrentCapacity();
      const maxCapacity = item.getMaxCapacity();
      // Find more items matching ammunition type
      const matchingItems = this._getItemsWithAmmoType(item.actor, item.system.ammunitionType);
      let amount = 0;
      matchingItems.forEach( (matchingItem) => {
        amount += matchingItem.getCurrentCapacity();
      });
      return amount;
    }
  }
  
  _showDialogQuickActionEntry(token, actionGroup) {
    if(!Object.keys(QuickMenuOptions.skills).includes(actionGroup) && !Object.keys(QuickMenuOptions.altActions).includes(actionGroup) && !Object.keys(QuickMenuOptions.moveDefend).includes(actionGroup)) {
        return this.showDialogError("Error", "That isn't a valid action group");
    }
    let dialogName = actionGroup.replace(" ", "_");
    if (!token) {
        return this.showDialogError("Error", "No target");
    }
    let buttons = {};
    for (const [key, value] of Object.entries(this._availableActions)) {
      if (value.properties[1] == actionGroup) {
        // do we require training. if so make sure we have it
        if (value.requireTraining) {
          let ranks = token.actor?.system?.skills[value.requireTraining]?.ranks
          if(ranks === undefined || ranks === null || ranks === 0) {
            // we need training so can't use this skill. skip over it completely.
            continue;
          }
        }
        buttons[key] = {
          label: `
          <span>${value.name}</span>
          <span>${value.shortDescription}</span>
          <span class="rubicon-button-property-block">${value.properties[0]} <span style="padding-left: 3px;">${value.buttonComment}</span></span>`,
          callback: () => {
            if (value.allowItem) {
              this._showDialogQuickActionItem(token, key);
            } else {
              this.showSpecificItemChatDialog(token, key, null);
            }
          },
          icon: `<img src="${value.img}" />`
        };
      }
    }
    const myDialog = new Dialog({
      title: `Quick Action: ${actionGroup}`,
      content: `<b>${token.actor.name}</b><br/>Select an action to perform.`,
      buttons: buttons
    }, {id: `rubiconQuickActionDialog_${dialogName}`, options: {height: 600}}).render(true); // height is max height to expand to
  }
  
  _getItemTypeSortValue(t) {
    //
    if (t === "weapon") return 1;
    if (t === "shield") return 2;
    if (t === "equipment") return 3;
    if (t === "ammunition") return 4;
    if (t === "consumable") return 5;
    if (t === "goods") return 6;
    if (t === "quest") return 7;
    if (t === "technological") return 8;
    //
    if (t === "class") return 101;
    if (t === "race") return 102;
    if (t === "theme") return 103;
    if (t === "feat") return 104;
    //
    if (t === "spell") return 200;
    //
    return 10000;
  }
  
  _sortItems(items) {
    return items.sort((a, b) => {
      // check the type sorts
      let aTypeSort = this._getItemTypeSortValue(a.type);
      let bTypeSort = this._getItemTypeSortValue(b.type);
      if (aTypeSort != bTypeSort) {
        return aTypeSort - bTypeSort;
      }
      // check the spell levels
      let aSpellLevel = a.type === "spell" ? a.system.level : -1;
      let bSpellLevel = b.type === "spell" ? b.system.level : -1;
      if (aSpellLevel != bSpellLevel) {
        return a.system.level - b.system.level;
      }
      if (a.type === "spell" && b.type === "spell") {
        // sort by name
        return a.name.localeCompare(b.name);
      }
      // check the container
      let aParentSort = a.parentItem !== null && a.parentItem !== undefined ? a.parentItem.sort : -1;
      let bParentSort = b.parentItem !== null && b.parentItem !== undefined ? b.parentItem.sort : -1;
      if (aParentSort != bParentSort) {
        return aParentSort - bParentSort;
      }
      // sort normally
      return a.sort - b.sort;
    });
  }
  
  async _showDialogQuickActionItem(token, entry) {
    if (!token) {
      return this.showDialogError("Error", "No target");
    }
    let action = this._availableActions[entry];
    if (!action) {
      return this.showDialogError("Error", "No action");
    }
    if (action.allowItem === 9 && token.actor.type !== "npc2") {
      return this.showDialogError("Error", "Only usable on NPC tokens");
    }
    let dialogName = entry.replace(" ", "_");
    // determine what we're doing
    let dialogString = `an item to perform ${action.name} with`;
    if (action.allowItem === 1 || action.allowItem === 3) {
      dialogString = `a weapon to perform ${action.name} with`;
    } else if (action.allowItem === 4) {
      dialogString = "a spell to cast";
    } else if (action.allowItem === 5) {
      dialogString = "a weapon to reload";
    } else if (action.allowItem === 6) {
      dialogString = "something to equip";
    } else if (action.allowItem === 7) {
      dialogString = "something to unequip";
    } else if (action.allowItem === 8) {
      dialogString = "an item to use";
    } else if (action.allowItem === 9) {
      dialogString = "a spell to (un)identify";
    }
    // find all the items that can be used, put them into an Array
    let items = [];
    let actorItems = this._sortItems(Array.from(token.actor.items));
    //console.log(actorItems);
    actorItems.forEach( (item) => {
      // does the entry allow the item?
      if (action.allowItem === 4 || action.allowItem === 9) {
        if (item?.type === "spell") {
          items.push(item);
        }
      } else if (action.allowItem === 8) {
        if (item?.type === "consumable") {
          items.push(item);
        }
      } else if (action.allowItem === 5) {
        if (item?.type === "weapon" && item?.system?.weaponType !== "grenade" && item.hasCapacity()) { // item must be a weapon with a capacity
          if (item.getCurrentCapacity() < item.getMaxCapacity()) { // item must not be fully loaded
            if (item.system.ammunitionType !== "charge") { // don't allow battery-powered weapons to be reloaded (this requires a recharging station or completely swapping batteries)
              items.push(item);
            }
          }
        }
      } else if (action.allowItem === 6 || action.allowItem === 7) {
        if (["weapon", "shield"].includes(item?.type) && item?.name !== "Unarmed strike" && item?.name !== "Natural Weapons") {
          if (action.allowItem === 6 && item?.system?.equippable && !item?.system?.equipped) {
            if (item?.type === "weapon" && item?.system?.weaponType === "grenade") {
              // only allow pushing the grenade if the capacity is greater than zero.
              if (item.getCurrentCapacity() > 0) {
                items.push(item);
              }
            } else {
              items.push(item);
            }
          } else if (action.allowItem === 7 && item?.system?.equipped) {
            // is this in a container that doesn't allow unequip, if so, ignore.
            const container = getItemContainer(actorItems, item);
            if (!["Light weapon mount"].includes(container?.name)) {
              // unequip
              items.push(item);
            }
          }
        }
      } else {
        if (item?.system?.equipped && item?.system?.actionType && action.itemActionTypes.includes(item?.system?.actionType)) {
          //console.log(`We can use ${item.name}`);
          items.push(item);
        } else {
          //console.log(`We can't use ${item.name} / ${item?.system?.equipped} / ${item?.system?.actionType}`);
        }
      }
    });
    // now we have all the items
    //console.log(items);
    if (items.length === 0) {
      return this.showDialogError("Error", "You don't have any items equipped you can perform this action with.");
    }
    let buttons = {};
    let spellTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const item of items) {
      //console.log(item);
      let name = item.name.split("(")[0].trim();
      let description = "";
      let propertyString = "";
      let comment = "";
      if (item.type == "spell") {
        // if this is unidentified add that to the name
        if (item.actor.type == "npc2" && item.system?.identified !== true) {
          name = `${name} <span style="color: red; font-weight: normal;">(unidentified)</span>`;
        }
        // get the spell school
        let schoolString = SFRPG.spellSchools[item.system.school] ? game.i18n.localize(SFRPG.spellSchools[item.system.school]) : "Unknown";
        name = `<span class="rubicon-spell-school-box">${schoolString}</span> <!--<span class="rubicon-spell-level-box">Lv ${item.system.level}</span>--> ${name}`
        spellTotals[item.system.level] = spellTotals[item.system.level] + 1;
        let newDesc = SpellDescriptions[item.name.split("(")[0].trim()];
        if (newDesc) {
          description = `${description}<span class="rubicon-item-description">${newDesc}</span>`
        }
      }
      if (item.type == "consumable") {
        // get the consumable description
        let newDesc = ConsumableDescriptions[item.name.split("(")[0].trim()];
        if (newDesc) {
          description = `${description}<span class="rubicon-item-description">${newDesc}</span>`
        }
      }
      if (["mwak", "rwak", "msak", "rsak", "save"].includes(item?.system?.actionType)) {
        if (item?.system?.actionType === "save") {
          if (item?.labels?.save) {
            description = `${description}<span class="rubicon-weapon-save-box">${item.labels.save}</span>`
          }
        } else {
          // get the attack and damage rolls
          let actionTarget = action.itemSpecialTarget ?? item?.system?.actionTarget;
          actionTarget = SFRPG.actionTargets[actionTarget] ? actionTarget : "other";
          let target = SFRPG.actionTargets[actionTarget];
          description = `${description}<span class="rubicon-weapon-target-box rubicon-weapon-target-${actionTarget}">${target}</span>`
          let attack = ActorSheetSFRPG.getAttackString(item);
          description = `${description}<span class="rubicon-weapon-attack-box">${attack}</span>`
        }
        let damage = ActorSheetSFRPG.getDamageString(item);
        if (damage !== "Damage") {
          description = `${description}<span class="rubicon-weapon-damage-box">${damage}</span>`
        }
      }
      if (item.parentItem !== null && item.parentItem !== undefined) {
        name = `${name} <span class="rubicon-item-capacity-box">[${item.parentItem.name}]</span>`;
      }
      if (item.hasCapacity() && item?.system?.weaponType !== "grenade") {
        let currentCapacity = item.getCurrentCapacity();
        let capacityColour = currentCapacity < 1 ? " style=\"color:#900;\"" : "";
        name = `${name} <span class="rubicon-item-capacity-box"${capacityColour}>(${item.getCurrentCapacity()} / ${item.getMaxCapacity()})</span>`
        if (action.allowItem === 5) {
          let ammoType = `${item.system.ammunitionType}`.toLowerCase()
          if (!ammoType.endsWith("s")) {
            ammoType = `${ammoType}s`
          }
          description = `${description}<span class="rubicon-item-description">${this._getItemRemainingAmmo(item)} spare ${ammoType} available</span>`
        }
      }
      // get the properties.
      let itemChatCard = item ? await item.getChatData() : null;
      let itemProperties = itemChatCard ? itemChatCard.properties : null;
      if (itemProperties) {
        if (item.type == "spell" && itemProperties.length >= 2) {
          // Remove the level and the school, as we're already showing those in the top right corner of the button
          itemProperties.shift();
          itemProperties.shift();
        }
        propertyString = `${propertyString}<span class="rubicon-button-property-labels">`;
        itemProperties.forEach((prop) => {
          propertyString = `${propertyString}<span class="rubicon-button-property-label"`
          if (prop.tooltip) {
            propertyString = `${propertyString} data-tooltip="${prop.tooltip}"`;
          }
          propertyString = `${propertyString}>`;
          if (prop.title) {
            propertyString = `${propertyString}<strong>${prop.title}:</strong> `
          }
          propertyString = `${propertyString}${prop.name}</span>`;
        });
        propertyString = `${propertyString}</span>`;
      }
      if (!description) { description = "&nbsp;"; }
      if (!propertyString) { propertyString = "&nbsp;"; }
      if (!comment) { comment = "&nbsp;"; }
      buttons[`itemQuickActionButton_${item._id}`] = {
        label: `
        <span class="rubicon-button-item-name">${name}</span>
        <span>${description}</span>
        <span class="rubicon-button-property-block">${propertyString} <span style="padding-left: 3px;">${comment}</span></span>`,
        callback: () => {
          if (action.allowItem === 3 || action.allowItem === 8) {
            item.roll(); // just show the normal item roll card
          } else if (action.allowItem === 4) {
            token.actor.useSpell(item); // just show the normal spell usage dialog
          } else if (action.allowItem === 5) {
            item.reload(); // reload the weapon
          } else if (action.allowItem === 6) {
            item.update({"system.equipped": true});
            this.postEquipChatMessage(token, token.actor, item, true);
          } else if (action.allowItem === 7) {
            item.update({"system.equipped": false});
            this.postEquipChatMessage(token, token.actor, item, false);
          } else if (action.allowItem == 9) {
            let newStatus = item.system?.identified === true ? false : true;
            let statusString = newStatus ? 'identified' : 'unidentified';
            item.update({"system.identified": newStatus});
            this.showDialogError("Identification status changed", `${item.name} of ${token.actor.name} is now ${statusString}.`);
          } else {
            this.showSpecificItemChatDialog(token, entry, item);
          }
        },
        tab: `${item?.system?.level}`,
        icon: `<img src="${item.img}" />`
      };
    };
    if (action.allowItem === 4) {
      const tabs = [];
      for (const tabNumber of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        if (spellTotals[tabNumber] > 0) {
          tabs.push({ label: `${tabNumber}`,
                     title: `Lv ${tabNumber}`,
                     content: ""});
        }
      }
      if (tabs.length < 1) {
        return this.showDialogError("Error", "No spells available");
      }
      const rendered_html = await renderTemplate("modules/rubicon-sfrpg/templates/tabbed-dialog.hbs", {
        header: `<b>${token.actor.name}</b><br/>Select ${dialogString}.`,
        buttons: buttons,
        tabs: tabs
      });    
      const myDialog = new Dialog({
          title: `Quick Action: ${action.name}`,
          content: rendered_html,
          buttons: buttons
      }, {id: `rubiconQuickActionDialog_TABBED_${dialogName}`, options: {height: 600}, tabs: [{ navSelector: ".tabs", contentSelector: ".content", initial: "0" }]}).render(true); // height is max height to expand to
    } else {    
      const myDialog = new Dialog({
          title: `Quick Action: ${action.name}`,
          content: `<b>${token.actor.name}</b><br/>Select ${dialogString}.`,
          buttons: buttons
      }, {id: `rubiconQuickActionDialog_${dialogName}`, options: {height: 600}}).render(true); // height is max height to expand to
    }
  }
  
  async postEquipChatMessage(token, actor, item, isEquipped) {
    let itemChatCard = await item.getChatData();
    let templateArguments = {
      actor: actor,
      action: isEquipped ? "Equips" : "Unequips",
      item: item.parentItem,
      usingString: isEquipped ? "from" : "returning it to",
      img: item.img,
      name: item.name,
      description: "", //isEquipped ? item.system.description?.value : "",
      properties: [!isEquipped || ["Cheek Pouches", "Quick-release sheath"].includes(item.parentItem?.name) ? "Swift action" : "Move action"],
      /*
      properties2: isEquipped && itemChatCard ? itemChatCard.properties : null,
      */
      buttons: []
    };
    if (actor.type != "character" && token) {
      templateArguments["tokenId"] = token.id;
      if (token.scene) {
        templateArguments["sceneId"] = token.scene.id;
      }
    }
    let content = await renderTemplate("modules/rubicon-sfrpg/templates/rubicon-custom-card.hbs", templateArguments);
    let rollMode = game.settings.get("core", "rollMode");
    let chatCardData = {
      user: game.user.id,
      type: CONST.CHAT_MESSAGE_STYLES.OTHER,
      content: content,
      flags: {
        core: {
          canPopout: !0
        },
        rollMode: rollMode
      },
      speaker: token ? ChatMessage.getSpeaker({token: token}) : ChatMessage.getSpeaker({actor: actor})
    }
    ChatMessage.create(chatCardData, {
      displaySheet: !1
    });
  }
  
  _getActualControlledToken() {
    if (canvas.tokens.controlled[0]) {
      return canvas.tokens.controlled[0];
    }
    if (game.user.character) {
      for (const token of canvas.tokens.ownedTokens) {
        if (token.actor == game.user.character) {
          return token;
        }
      }
    }
    return null;
  }
  
  _getAttackModifiersForActor(actor, actionType) {
    //console.log(actor);
    //console.log(actionType);
    const t = [SFRPGEffectType.ALL_ATTACKS];
    if (["msak", "rsak"].includes(actionType)) {
      t.push(SFRPGEffectType.SPELL_ATTACKS);
    } else if ("rwak" === actionType) {
      t.push(SFRPGEffectType.RANGED_ATTACKS);
    } else if ("mwak" === actionType) {
      t.push(SFRPGEffectType.MELEE_ATTACKS);
    }
    //console.log(t);
    let a = actor.getAllModifiers();
    //console.log(a);
    a=a.filter((e=> {
        if(!e.enabled && e.modifierType !== SFRPGModifierType.FORMULA) return !1;
        if("parent" === e.limitTo) return !1;
        if("container" === e.limitTo) return !1;
        if(e.effectType===SFRPGEffectType.WEAPON_ATTACKS) return !1;
        if(e.effectType===SFRPGEffectType.WEAPON_PROPERTY_ATTACKS) return !1
        if(e.effectType===SFRPGEffectType.WEAPON_CATEGORY_ATTACKS) return !1;
        return t.includes(e.effectType)
    }));
    //console.log(a);
    return a;
  }
  
  async showSpecificItemChatDialog(token, entry, item) {
    if (!this._availableActions[entry]) {
      ui.notifications.error("Invalid entry");
      return;
    }
    let e = this._availableActions[entry];
    if (!item && e.allowItem === 1) {
      ui.notifications.error("This action must be used with an item");
      return;
    }
    if (!item && e.allowItem > 2) {
      ui.notifications.error("This action must be used with an item");
      return;
    }
    if (item && e.allowItem === 0) {
      ui.notifications.error("This action can't be used with an item");
      return;
    }
    await this.showCustomItemChatDialog(token, item, e.img, e.name, e.description, e.properties, item ? e.hasItemButtons : e.hasNoItemButtons);
  }
  
  async showCustomItemChatDialog(token, item, img, name, description, properties, buttons) {
    let actor = token ? token.actor : game.user.character;
    let itemChatCard = item ? await item.getChatData() : null;
    //console.log(itemChatCard);
    let templateArguments = {
      actor: actor,
      item: item,
      itemProperties: itemChatCard ? itemChatCard.properties : null,
      img: img,
      name: name,
      description: description, //"Hello world <b>and welcome</b> to the message",
      properties: properties, //[ "awesome", "awful", "test" ],
      buttons: buttons /*[
        { name: name, action: "rollAttack", value: "mwak", target: "eac", content: "Melee Attack EAC" },
        { name: name, action: "rollAttack", value: "mwak", target: "kac", content: "Melee Attack KAC" },
        { name: name, action: "rollAttack", value: "mwak", target: "kac8", content: "Melee Attack KAC+8" },
        { name: name, action: "rollAttack", value: "rwak", target: "eac", content: "Ranged Attack EAC" },
        { name: name, action: "rollAttack", value: "rwak", target: "kac", content: "Ranged Attack KAC" },
        { name: name, action: "rollAttack", value: "rwak", target: "kac8", content: "Ranged Attack KAC+8" },
        { name: name, action: "rollSkill", value: "acr", target: "", content: "Roll Acrobatics Check" },
        { name: name, action: "rollSkill", value: "lsc", target: "", content: "Roll Life Science Check" },
        { name: name, action: "rollSkill", value: "pro", target: "", content: "Roll Profession Check" }
      ]*/
    };
    // sets the token ID and scene ID if its not the player's character
    if (actor.type != "character" && token) {
      templateArguments["tokenId"] = token.id;
      if (token.scene) {
        templateArguments["sceneId"] = token.scene.id;
      }
    }
    //console.log(templateArguments);
    let content = await renderTemplate("modules/rubicon-sfrpg/templates/rubicon-custom-card.hbs", templateArguments);
    let rollMode = game.settings.get("core", "rollMode");
    let chatCardData = {
      user: game.user.id,
      type: CONST.CHAT_MESSAGE_STYLES.OTHER,
      content: content,
      flags: {
        core: {
          canPopout: !0
        },
        rollMode: rollMode
      },
      speaker: token ? ChatMessage.getSpeaker({token: token}) : ChatMessage.getSpeaker({actor: actor})
    }
    return ["gmroll", "blindroll"].includes(rollMode) && (chatCardData.whisper = ChatMessage.getWhisperRecipients("GM")),
            "blindroll" === rollMode && (chatCardData.blind = !0),
            "selfroll" === rollMode && (chatCardData.whisper = ChatMessage.getWhisperRecipients(game.user.name)),
            ChatMessage.create(chatCardData, {
              displaySheet: !1
            });
  }
  
  async _onButtonClick(evt) {
    let action = evt.currentTarget.dataset.action;
    let value = evt.currentTarget.dataset.value;
    let target = evt.currentTarget.dataset.target;
    let name = evt.currentTarget.dataset.name;
    let special = evt.currentTarget.dataset.special;
    let token = null;
    if (["rollAttack", "rollDamage"].includes(action)) {
      let chatCard = evt.currentTarget.closest(".chat-card");
      let actor = null;
      if (chatCard.dataset.tokenId) {
        let scene = canvas.scene;
        if (chatCard.dataset.sceneId) {
          scene = game.scenes.get(chatCard.dataset.sceneId);
          if (!scene) {
            ui.notifications.error("Can't find scene");
            return;
          }
        }
        token = scene.tokens.get(chatCard.dataset.tokenId);
        if (!token) {
          ui.notifications.error("Can't find token");
          return;
        }
        actor = token.actor;
      } else if (chatCard.dataset.actorId) {
        actor = game.actors.get(chatCard.dataset.actorId);
      }
      if (!actor) {
        ui.notifications.error("Can't find actor");
        return;
      }
      let item = null;
      if (chatCard.dataset.itemId) {
        item = actor.items.get(chatCard.dataset.itemId);
        if (!item) {
          ui.notifications.error("Can't find item");
          return;
        }
      }
      //console.log(item);
      if (action == "rollAttack") {
        // should we print a warning?
        if (item) {
          let usage = item.system.usage?.value || 0;
          if (item.getCurrentCapacity() < usage) {
            ui.notifications.warn(game.i18n.format("SFRPG.ItemNoAmmo", {
              name: item.name
            }));
          }
        }
        let context = item ? RollContext.createItemRollContext(item, actor) : RollContext.createActorRollContext(actor);
        let parts = [];
        if (item) {
          // make sure we're using a weapon
          if (item.type !== "weapon") {
            ui.notifications.error("Not allowed for this item");
            return;
          }
          // add the item's attack bonus, if it has one
          if (Number.isNumeric(item.system.attackBonus) && 0 !== item.system.attackBonus) {
            parts.push("@item.attackBonus");
          }
          // select the correct ability modifier for the item
          let ability = item.system.ability;
          if (ability == "str" && item.system.properties?.operative && actor.system.abilities.dex.value > actor.system.abilities.str.value) {
            ability = "dex";
          }
          parts.push(`@abilities.${ability}.mod`);
        } else {
          // this isn't an item, so use dex for ranged and str for melee
          parts.push(value == "rwak" ? "@abilities.dex.mod" : "@abilities.str.mod");
        }
        // add the base attack bonus if the actor has one
        if (["character", "drone"].includes(actor.type)) {
          parts.push("@attributes.baseAttackBonus.value");
        }
        if (item) {
          // lower the attack roll by 4 if the player isn't proficient in using the weapon
          const weaponTypeProficiency = SFRPG.weaponTypeProficiency[item.system.weaponType];
          if (!(item.system.proficient || actor?.system?.traits?.weaponProf?.value?.includes(weaponTypeProficiency))) {
            parts.push(`-4[${game.i18n.localize("SFRPG.Items.NotProficient")}]`)
          }
        }
        // get starfinder's standard global attack roll modifiers
        let modifiers = foundry.utils.deepClone(SFRPG.globalAttackRollModifiers).map((e=> {
              const t = { actorUuid: actor.uuid };
              return { bonus: new SFRPGModifier( { ...e.bonus, container: t } )
            }
          }
        ))
        // get attack modifiers for item/actor
        let attackModifiers = item ? item.getAppropriateAttackModifiers(["weapon","shield"].includes(item.type)) : this._getAttackModifiersForActor(actor, value);
        let stackModifierObject = new StackModifiers;
        attackModifiers = await stackModifierObject.processAsync(attackModifiers, null, { actor: actor });
        // identify the applicable ones and pull them out
        const actorBonuses=[];
        let reductionFunction=(e, t)=> {
            if (e.modifierType===SFRPGModifierType.FORMULA) return void actorBonuses.push(e);
            const a = e.modifier;
            return t.push( {score: a, explanation:e.name } ), a
        };
        Object.entries(attackModifiers).reduce(((e, t)=> {
              if(null===t[1]||t[1].length<1)return 0;
              if([SFRPGModifierTypes.CIRCUMSTANCE, SFRPGModifierTypes.UNTYPED].includes(t[0]))for(const e of t[1])reductionFunction(e, parts);
              else reductionFunction(t[1], parts);
              return 0
          }
        ), 0);
        for (const e of actorBonuses) modifiers.push( { bonus: e } );
        // add the bonuses to the roll
        context.addContext("additional", { name: "additional" }, { modifiers: { bonus: "n/a", rolledMods: modifiers } });
        parts.push("@additional.modifiers.bonus");
        let itemStrSuffix = "";
        if (item) {
          itemStrSuffix = ` (${item.name})`;
        }
        // roll
        DiceSFRPG.d20Roll( {
          rollContext: context,
          parts: parts,
          title: `Attack Roll - ${name}${itemStrSuffix}`,
          speaker: token ? ChatMessage.getSpeaker({token: token}) : ChatMessage.getSpeaker({actor: actor}),
          rollOptions: {
            actionTarget: target ? target : item ? item.system.actionTarget : "",
            actionTargetSource: SFRPG.actionTargets
          },
          critical: 20,
          onClose: function() {
            if(item) {
              item.consumeCapacityFromUsage();
            }
          }
        });
      }
      else if (action == "rollDamage") {
        if (!item) {
          ui.notifications.info("Item required to deal damage");
          return;
        }
        item.rollDamage({});
      }
    } else {
      token = this._getActualControlledToken();
      if (!token) { ui.notifications.error("No token selected"); return; }
      if (action == "rollSkill") {
        token.actor.rollSkill(value);
      } else if (action == "rollSave") {
        token.actor.rollSave(value);
      } else if (action == "rollAbility") {
        token.actor.rollAbility(value);
      } else if (action == "doAttack") {
        this.showDialogQuickBasicAttack(token)
      } else {
        ui.notifications.error("Unknown action")
      }
    }
  }
  
  
  async _onHudActionClick(evt) {
    let token = this._getActualControlledToken();
    if (!token) { ui.notifications.error("No token selected"); return; }
    let action = evt.currentTarget.dataset.action;
    //console.log(`Action ${action} from hud action click`);
    if (action == "attack") {
      this.showDialogQuickBasicAttack(token);
    } else if (action == "altAttack") {
      this.showDialogQuickAltAttack(token);
    } else if (action == "defend") {
      this.showDialogQuickMoveDefend(token);
    } else if (action == "reload") {
      this.showDialogQuickEquipReload(token);
    } else if (action == "consumable") {
      this.showDialogQuickConsumable(token);
    } else if (action == "skillAction") {
      this.showDialogQuickAction(token);
    } else if (action == "quickRoll") {
      this.showDialogQuickRoll(token);
    } else if (action == "cast") {
      this.showDialogQuickSpell(token);
    } else {
      ui.notifications.error("Invalid action"); return;
    }
  }
  
  /*
  _onRenderChatMessage(chatMessage, html, messageData) {
    //console.log("Rubicon | onRenderChatMessage");
    //console.log(chatMessage);
    //console.log(html);
    //console.log(messageData);
  }
  */

  _onItemChange(item) {
    this._updateActor();
    //this._updateItems();
  }

  _onActorChange(actor) {
    this._updateActor();
  }
  
  _onTokenChange(tokenDocument, updates, context) {
    if (this._actor == tokenDocument.actor) {
      this._updateActor();
    }
  }
  
  _selectControlledToken() {
    const token = this._getActualControlledToken();
    if (token) {
      if (this._actor != token.actor) {
        this._hide();
        this._actor = token.actor;
        this._updateActor();
        this._show();
      }
    } else {
      this._actor = null;
      this._hide();
    }
  }
  
  _show() {
    // this makes the HUD container show in 1ms time, which avoids a bug where the content sort-of procedurally updates.
    setTimeout(function(){
      document.getElementsByClassName("rubicon-hud-outer-container")[0].style.display = "block";
    },1);
  }
  
  _hide() {
      document.getElementsByClassName("rubicon-hud-outer-container")[0].style.display = "none";
  }
  
  _updateActor() {
    if (!this._actor) return;
    document.getElementById("rubicon-hud-character-name").textContent = this._actor.name;
    document.getElementById("rubicon-hud-portrait").getElementsByTagName('img')[0].src = this._actor.img;
    let attributes = this._actor.system.attributes;
    document.getElementById("rubicon-hud-eac-value").textContent = attributes.eac.value;
    document.getElementById("rubicon-hud-kac-value").textContent = attributes.kac.value;
    if (attributes.speed) {
      let movementType = attributes.speed.movementType;
      if (!movementType) {
        movementType = attributes.speed.mainMovement;
      }
      let movementStr = "?";
      if (movementType == "burrowing") {
        movementStr = "Burr";
      }
      else if (movementType == "climbing") {
        movementStr = "Cli";
      }
      else if (movementType == "flying") {
        movementStr = "Fly";
      }
      else if (movementType == "land") {
        movementStr = "Move";
      }
      else if (movementType == "swimming") {
        movementStr = "Swim";
      }
      else if (movementType == "special") {
        movementStr = "Spec";
      }
      document.getElementById("rubicon-hud-speed-heading").textContent = movementStr;
      document.getElementById("rubicon-hud-speed-value").textContent = `${attributes.speed[movementType].value} ft`;
    } else {
      document.getElementById("rubicon-hud-speed-heading").textContent = "Move";
      document.getElementById("rubicon-hud-speed-value").textContent = "0 ft";
    }
    
    // update the challenge rating or player level
    let details = this._actor.system.details;
    if (this._actor.type == "character") {
      // determine the class
      let classes = [];
      for(const [classname, classdata] of Object.entries(this._actor.system.classes)) {
        if (classdata.levels > 0) {
          classes.push(String(classname).charAt(0).toUpperCase() + String(classname).slice(1));
        }
      }
      let classesString = classes.join("-")
      document.getElementById("rubicon-hud-character-level").textContent = `Level ${details.level.value} ${classesString}`;
    } else if (this._actor.type == "drone") {
      document.getElementById("rubicon-hud-character-level").textContent = `Level ${details.level.value} Drone`;
    } else if (this._actor.type == "npc2") {
      let c = `CR ${details.cr}`;
      if (details.cr < 0.3) {
        c = "CR 1/4";
      } else if (details.cr < 0.5) {
        c = "CR 1/3";
      } else if (details.cr < 1) {
        c = "CR 1/2";
      }
      document.getElementById("rubicon-hud-character-level").textContent = c;
    } else {
      document.getElementById("rubicon-hud-character-level").textContent = "";
    }
    
    // health. everyone should have this.
    let tempHealthValue = "";
    if(attributes.hp.temp !== undefined && attributes.hp.temp !== null && attributes.hp.temp > 0) {
      tempHealthValue = ` (+${attributes.hp.temp})`
    }
    document.getElementById("rubicon-hud-health-value").textContent = `${attributes.hp.value} / ${attributes.hp.max}${tempHealthValue}`
    if (attributes.hp.max < 1) {
      document.getElementById("rubicon-hud-health-background").style.width = "0%";
    } else {
      let widthPercentage = (attributes.hp.value * 100) / attributes.hp.max;
      document.getElementById("rubicon-hud-health-background").style.width = `${widthPercentage}%`;
    }
    
    // stamina. players only.
    if (attributes.sp && attributes.sp.max > 0) {
      document.getElementById("rubicon-hud-stamina-value").textContent = `${attributes.sp.value} / ${attributes.sp.max}`
      let widthPercentage = (attributes.sp.value * 100) / attributes.sp.max;
      document.getElementById("rubicon-hud-stamina-background").style.width = `${widthPercentage}%`;
    } else {
      document.getElementById("rubicon-hud-stamina-value").textContent = "-";
      document.getElementById("rubicon-hud-stamina-background").style.width = "0%";
    }
    
    // resolve. players. rarely some mobs.
    if (attributes.rp && attributes.rp.max > 0) {
      document.getElementById("rubicon-hud-resolve-value").textContent = `${attributes.rp.value} / ${attributes.rp.max}`
      let widthPercentage = (attributes.rp.value * 100) / attributes.rp.max;
      document.getElementById("rubicon-hud-resolve-background").style.width = `${widthPercentage}%`;
    } else {
      document.getElementById("rubicon-hud-resolve-value").textContent = "-";
      document.getElementById("rubicon-hud-resolve-background").style.width = "0%";
    }
    
    this._updateItems();
  }
  
  _updateItems() {
    // is this player a spellcaster ?
    let spells = this._actor.system.spells;
    let hasConfiguredSpells = false;
    if (spells) {
      let spellTargets = ["spell1", "spell2", "spell3", "spell4", "spell5", "spell6"];
      let spellClasses = ["mystic", "precog", "technomancer", "witchwarper"];
      for (const [a, key] of Object.entries(spellTargets)) {
        let spellValues = [];
        if (spells[key].value || spells[key].max) {
          spellValues.push(spells[key].value);
        }
        for (const [b, key2] of Object.entries(spellClasses)) {
          if (spells[key].perClass[key2] && spells[key].perClass[key2].value != undefined) {
            spellValues.push(spells[key].perClass[key2].value);
          }
        }
        let spellResult = Array.prototype.join.call(spellValues, ", ")
        if (spellValues.length > 0) {
          hasConfiguredSpells = true;
        } else {
          spellResult = "-";
        }
        document.getElementById(`rubicon-hud-${key}-value`).textContent = spellResult;
      }
    }
    if (hasConfiguredSpells) {
      document.getElementsByClassName("rubicon-spell-hud")[0].style.display = "flex";
      document.getElementById("rubicon-hud-action-spell-cast-button").style.display = "inline-block";
    } else {
      document.getElementsByClassName("rubicon-spell-hud")[0].style.display = "none";
      document.getElementById("rubicon-hud-action-spell-cast-button").style.display = "none";
    }
    // delete all the statuses and equipped items
    let statuses = document.getElementsByClassName("rubicon-hud-statuses")[0];
    statuses.textContent = "";
    let equipment = document.getElementById("rubicon-hud-equipment-section");
    equipment.textContent = "";
    let items = this._sortItems(Array.from(this._actor.items));
    items.forEach((item) => {
      if (item.type == "effect") {
        if (item.system.showOnToken === true && item.system.enabled === true) {
          let rootItem = document.createElement('div');
          rootItem.className = 'rubicon-hud-status-box';
          let imageItem = document.createElement('img');
          imageItem.src = item.img;
          rootItem.appendChild(imageItem);
          let spanItem = document.createElement('span');
          spanItem.textContent = item.name;
          rootItem.appendChild(spanItem);
          statuses.appendChild(rootItem);
        }
      } else if (["weapon", "shield"].includes(item.type)) {
          if (item.system.equipped) {
            //console.log(item);
            let rootItem = document.createElement('div');
            rootItem.className = 'rubicon-hud-row rubicon-hud-equipment';
            let iconDiv = document.createElement('div');
            iconDiv.className = "rubicon-hud-equipment-icon";
            let icon = document.createElement('img');
            icon.src = item.img;
            iconDiv.appendChild(icon);
            rootItem.appendChild(iconDiv);
            let nameDiv = document.createElement('div')
            nameDiv.className = 'rubicon-hud-equipment-name';
            nameDiv.textContent = item.name;
            rootItem.appendChild(nameDiv);
            let ammoDiv = document.createElement('div')
            ammoDiv.className = 'rubicon-hud-equipment-charges';
            if (item.system.capacity && item.system.capacity.max > 0) {
              let currentCapacity = item.getCurrentCapacity();
              let maxCapacity = item.getMaxCapacity();
              let extraCapacity = this._getItemRemainingAmmo(item);
              let extraCapacityString = extraCapacity === undefined ? "" : ` \u00A0 (${extraCapacity})`;
              if (item?.type === "weapon" && item?.system?.weaponType === "grenade") {
                extraCapacityString = ""; // don't show capacity for grenades
              }
              ammoDiv.textContent = `${currentCapacity} / ${maxCapacity}${extraCapacityString}`;
            } else {
              ammoDiv.textContent = '';
            }
            rootItem.appendChild(ammoDiv);
            equipment.appendChild(rootItem);
          }
        }
    });
  /*
  // update the consumables
  for (let i = 0; i < 7; i++) {
    // get the target consumable
    let targetConsumable = RubiconConstants.defaultConsumables[i]; // TODO : this should come from actor if configured
    let consumableBlock = document.getElementById(`rubicon-hud-consumable-${i}`);
    let iconBlock = consumableBlock.getElementsByClassName("rubicon-hud-consumable-icon")[0].getElementsByTagName("img")[0];
    iconBlock.src = targetConsumable.icon;
    let amountBlock = consumableBlock.getElementsByClassName("rubicon-hud-consumable-amount")[0];
    amountBlock.textContent = `${i}` // TODO
    
  };
  */
  }
}