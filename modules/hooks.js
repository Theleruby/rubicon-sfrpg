import { Rubicon } from "./rubicon.js";

(async() => {
  // hack: disable the compatibility warnings.
	console.log("Rubicon Hooks | Disabling compatibility warnings in Foundry")
  CONFIG.compatibility.mode = CONST.COMPATIBILITY_MODES.SILENT;
})();

// Load the HUD and construct the app object
Hooks.once('ready', async function() {
	let rubiconHudHtml = await renderTemplate("modules/rubicon-sfrpg/templates/hud.hbs", {});
	document.getElementById("ui-bottom").insertAdjacentHTML("afterbegin", rubiconHudHtml);
	game.rubicon = new Rubicon();
	console.log("Rubicon Hooks | Initialized successfully")
});

// Fixes the bug where the chat card ends up with the wrong information printed on the first turn
Hooks.on("combatStart", function() {
  console.log("Rubicon Hooks | Combat round and turn corrected");
  game.combat.round = 1;
  game.combat.turn = 0;
  game.combat.current.turn = 0;
});

// Forces grenade to be unequipped when you attack with it. You've thrown it, so, it's no longer in your hand any more. Yeah.
Hooks.on("attackRolled", function(e) {
  if (e.item?.type === "weapon" && e.item?.system?.weaponType === "grenade" && e.item?.system?.equipped) {
    // NO!
    console.log("Rubicon Hooks | Force-unequipping grenade");
    e.item.update({"system.equipped": false});
  }
});

// Automatically select the appropriate token when the combat stage comes around
Hooks.on("updateCombat", function() {
  if (game.combat.round > 0) {
    console.log("Rubicon Hooks | Selecting matching token for turn");
    if (game.combat.combatant.isOwner || game.combat.combatant.token.permission == 3) {
      game.combat.combatant.token._object.control()
    } else {
      canvas.tokens.releaseAll()
    }
  }
});

// Before creating a chat message for a spell, check to see if the spell is identified. If not, we need to hide the chat card and also post a replacement.
Hooks.on('preCreateChatMessage', async function(doc, _data, _options) {
  if (!game.user?.isGM) {
    return;
  }
  console.log(doc);
  const whisper = doc.whisper || doc.data?.whisper;
  if (whisper && whisper.length > 0) {
    return;
  }
  if (doc.flags?.sfrpg?.item) {
    // get the item and find out if it's a spell being cast by an NPC.
    let item = await fromUuid(doc.flags.sfrpg.item);
    console.log(item);
    if (item.type == "spell" && item.actor.type == "npc2") {
      // TODO find out if we've identified this spell yet
      let identified = false;
      if (item.system?.identified !== true) {
        // first we have to hide the spell card so only the GM can see it
        doc.applyRollMode(CONST.DICE_ROLL_MODES.PRIVATE);
        // now, find out the difficulty of the DC to identify this spell
        let level = item.system.level ?? 0;
        let difficulty = 10 + (5*level);
        // now we have to create a whole new chat card with an identify box, and post it.
        let templateArguments = {
          actor: item.actor,
          img: "modules/rubicon-sfrpg/icons/unknown_spell.webp",
          name: "Unidentified Spell",
          description: "<p>If you can clearly observe this spell being cast, and you have Mysticism as a trained skill, you can use it to identify the spell. The DC of this check is equal to 10 + 5 × the level of the spell being cast. This does not require an action.</p><p>You can’t take 10 or 20 on a Mysticism check to identify a spell.</p>",
          properties: [],
          buttons: [
            {name: `Identify a Spell Being Cast`, action: "rollSkill", value: "mys", target: "", content: `Roll Mysticism Check`, special: ""},
            {name: `Fortitude Save`, action: "rollSave", value: "fort", target: "", content: `Roll Fortitude Save`, special: ""},
            {name: `Reflex Save`, action: "rollSave", value: "reflex", target: "", content: `Roll Reflex Save`, special: ""},
            {name: `Will Save`, action: "rollSave", value: "will", target: "", content: `Roll Will Save`, special: ""},
          ]
        };
        let content = await renderTemplate("modules/rubicon-sfrpg/templates/rubicon-custom-card.hbs", templateArguments);
        let rollMode = game.settings.get("core", "rollMode");
        let newChatCardData = {
          user: doc.user.id,
          type: CONST.CHAT_MESSAGE_STYLES.OTHER,
          content: content,
          flags: {
            core: {
              canPopout: !0
            },
            rollMode: rollMode
          },
          speaker: doc.speaker
        }
        ChatMessage.create(newChatCardData, {
          displaySheet: !1
        });
      }
    }
  }
});

// Disable all timed effects directly linked to feats that are still active when combat ends
Hooks.on("deleteCombat", function(combat) {
    console.log("Rubicon Hooks | Cleaning up a combat session")
    game.sfrpg.timedEffects.forEach((effect) => {
      if (effect.originItem) {
        console.log(`Rubicon Hooks | Forcing effect ${effect.name} to be reset`)
        // manually hack it disabled because fgs.
        effect.enabled = false;
        const e = effect.item, i = effect.actor;
        if (!e)
            return ui.notifications.error("Failed to toggle effect, item missing.");
        if (!i)
            return ui.notifications.error("Failed to toggle effect, actor missing.");
        const n = {
            _id: e._id,
            system: {
                enabled: false,
                modifiers: e.system.modifiers.map((t=>t.toObject?.() ?? t)),
                activeDuration: e.system.activeDuration
            }
        };
        for (let t = 0; t < e.system.modifiers.length; t++)
            n.system.modifiers[t].enabled = false,
            this.modifiers[t].enabled = false;
        effect.activeDuration.activationTime = -1
        n.system.activeDuration.activationTime = -1
        effect.activeDuration.expiryInit = -1
        n.system.activeDuration.expiryInit = -1
        effect.activeDuration.activationEnd = -1
        n.system.activeDuration.activationEnd = -1
        i.system.timedEffects.get(effect.uuid)?.update(this)
        game.sfrpg.timedEffects.get(effect.uuid)?.update(this)
        if (game.user?.isGM) {
          i.updateEmbeddedDocuments("Item", [n])
        }
      }
    });
});

Hooks.on("itemActivationChanged", function(evt) {
    //console.log(evt.actor)
    //console.log(evt.item)
    //console.log(evt.isActive)
    // is this explicitly forbidden from being activated? if so, ignore.
    // (requires sfrpg patch)
    if (evt.isActive && !evt.item.shouldHaveActivationToggled()) { //!evt.item?.system?.activation?.condition === "ignore") {
      //evt.item.update({"system.isActive": false});
      return;
    }
    // check to see if there's a matching linked effect. if there is, we enable it
    let x = evt.actor.items.find((i)=>i.type=="effect" && i.originItem?.uuid == evt.item.uuid)
    if (x) {
      let y = game.sfrpg.timedEffects.get(x.uuid)
      if (y) {
        if (y.enabled !== evt.isActive) {
          y.toggle();
        }
      }
    }
});

// If we're about to toggle an effect, update the activation status of the origin item, if one exists and it's activateable.
Hooks.on("preUpdateItem", function(item, changes, options, source) {
    //console.log("onPreUpdateItem");
    //console.log(item.type);
    //console.log(changes?.system?.enabled);
    //console.log(item.originItem?.system?.isActive);
    if (item.type == "effect" && changes?.system?.enabled !== undefined && changes?.system?.enabled !== null) {
      //console.log("effect toggle")
      if (item.originItem?.system?.isActive !== undefined && item.originItem?.system?.isActive !== null) {
        //console.log("isActive is defined")
        if (item.originItem?.system?.isActive !== changes?.system?.enabled) {
          //console.log(`${item.originItem?.system?.isActive} and ${changes?.system?.enabled} don't match. time to change it`)
          item.originItem.update({"system.isActive": changes?.system?.enabled});
        }
      }
    }
});

// Hack for better supporting powered items with "per-minute" capacity (e.g. disposal blade) via a linked timed effect
Hooks.on("consumeCapacityMinute", function(evt) {
    console.log("Rubicon Hooks | Trying to consume a per-minute capacity item")
    // we're trying to consume ammo for a "per minute" powered item
    // check to see if there's a matching linked effect
    let x = evt.actor.items.find((i)=>i.type=="effect" && i.originItem?.uuid == evt.item.uuid)
    if (x) {
      let y = game.sfrpg.timedEffects.get(x.uuid)
      if (y) {
        if (y.enabled) {
          // we don't do anything
        } else {
          // we toggle it and consume the ammo.
          y.toggle();
          evt.item.consumeCapacity(evt.value);
        }
      } else {
        ui.notifications.error("No linked effect for this weapon, ammo can't be deducted")
      }
    } else {
      ui.notifications.error("No linked effect for this weapon, ammo can't be deducted")
    }
});

/*
Hooks.on("onBeforeRoll", function(rollData) {
  console.log("ROLLING");
  console.log(rollData);
});
*/