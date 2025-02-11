const QuickMenuOptions = {};
QuickMenuOptions.full = {
  "_basicAttack_": {
    "name": "Basic attack",
    "img": "icons/skills/melee/hand-grip-sword-strike-orange.webp",
    "shortDescription": "Standard action",
    "properties": [],
    "requireTraining": false,
    "type": 1
  },
  "Full turn attack": {
    "name": "Full action",
    "img": "icons/magic/death/weapon-sword-skull-purple.webp",
    "shortDescription": "Charge, coup de grace, full attack",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Non-damaging attack": {
    "name": "Non-damaging ranged attack",
    "img": "icons/skills/targeting/target-strike-triple-blue.webp",
    "shortDescription": "Covering fire, harrying fire",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Combat maneuver": {
    "name": "Combat maneuver",
    "img": "icons/skills/melee/maneuver-greatsword-yellow.webp",
    "shortDescription": "Bull rush, dirty trick, disarm, grapple, reposition, sunder, trip",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Movement": {
    "name": "Movement",
    "img": "icons/magic/movement/trail-streak-impact-blue.webp",
    "shortDescription": "Move, crawl, guarded step, run, withdraw",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Defensive action": {
    "name": "Defensive action",
    "img": "icons/magic/defensive/shield-barrier-deflect-teal.webp",
    "shortDescription": "Fight defensively, total defense",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "_equip_": {
    "name": "Equip a weapon or shield",
    "img": "modules/rubicon-sfrpg/icons/quick-menu/equip.png",
    "shortDescription": "Move action",
    "properties": [],
    "requireTraining": false,
    "type": 1
  },
  "_unequip_": {
    "name": "Unequip a weapon or shield",
    "img": "modules/rubicon-sfrpg/icons/quick-menu/unequip.png",
    "shortDescription": "Move action",
    "properties": [],
    "requireTraining": false,
    "type": 1
  },
  "_reload_": {
    "name": "Reload",
    "img": "modules/rubicon-sfrpg/icons/quick-menu/reload.jpg",
    "shortDescription": "Move action",
    "properties": [],
    "requireTraining": false,
    "type": 1
  },
  "_consumable_": {
    "name": "Use a consumable item from your bag",
    "img": "icons/consumables/potions/potion-vial-corked-purple.webp",
    "shortDescription": "Standard or Full action",
    "properties": [],
    "requireTraining": false,
    "type": 1
  },
  "_skill_": {
    "name": "Use a skill",
    "img": "icons/magic/movement/chevrons-down-yellow.webp",
    "shortDescription": "Actions which require use of skills",
    "properties": [],
    "requireTraining": false,
    "type": 2
  },
  "_skillCheck_": {
    "name": "Perform a skill check",
    "img": "icons/commodities/biological/organ-brain-pink-purple.webp",
    "shortDescription": "Lets you do a basic skill roll",
    "properties": [],
    "requireTraining": false,
    "type": 3
  },
  "_basicSpell_": {
    "name": "Cast a spell",
    "img": "icons/magic/symbols/runes-star-pentagon-orange-purple.webp",
    "shortDescription": "Standard action",
    "properties": [],
    "requireTraining": false,
    "type": 1
  }
}
QuickMenuOptions.altActions = {
  "Full turn attack": {
    "name": "Full actions",
    "img": "icons/magic/death/weapon-sword-skull-purple.webp",
    "shortDescription": "Charge, coup de grace, full attack",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Non-damaging attack": {
    "name": "Non-damaging ranged attacks",
    "img": "icons/skills/targeting/target-strike-triple-blue.webp",
    "shortDescription": "Covering fire, harrying fire",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Combat maneuver": {
    "name": "Combat maneuvers",
    "img": "icons/skills/melee/maneuver-greatsword-yellow.webp",
    "shortDescription": "Bull rush, dirty trick, disarm, grapple, reposition, sunder, trip",
    "properties": [],
    "requireTraining": false,
    "type": 0
  }
}
QuickMenuOptions.moveDefend = {
  "Movement": {
    "name": "Movement",
    "img": "icons/magic/movement/trail-streak-impact-blue.webp",
    "shortDescription": "Move, crawl, run, withdraw",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Defensive action": {
    "name": "Defensive actions",
    "img": "icons/magic/defensive/shield-barrier-deflect-teal.webp",
    "shortDescription": "Fight defensively, total defense",
    "properties": [],
    "requireTraining": false,
    "type": 0
  }
}
QuickMenuOptions.equip = {
  "_equip_": {
    "name": "Equip",
    "img": "modules/rubicon-sfrpg/icons/quick-menu/equip.png",
    "shortDescription": "Equip a weapon or shield",
    "properties": ["Move action"],
    "requireTraining": false,
    "type": 1
  },
  "_unequip_": {
    "name": "Unequip",
    "img": "modules/rubicon-sfrpg/icons/quick-menu/unequip.png",
    "shortDescription": "Put a weapon or shield away",
    "properties": ["Move action"],
    "requireTraining": false,
    "type": 1
  },
}
QuickMenuOptions.equipReload = {
  "_equip_": {
    "name": "Equip",
    "img": "modules/rubicon-sfrpg/icons/quick-menu/equip.png",
    "shortDescription": "Equip a weapon or shield",
    "properties": ["Move action"],
    "requireTraining": false,
    "type": 1
  },
  "_unequip_": {
    "name": "Unequip",
    "img": "modules/rubicon-sfrpg/icons/quick-menu/unequip.png",
    "shortDescription": "Put a weapon or shield away",
    "properties": ["Move action"],
    "requireTraining": false,
    "type": 1
  },
  "_reload_": {
    "name": "Reload",
    "img": "modules/rubicon-sfrpg/icons/quick-menu/reload.jpg",
    "shortDescription": "Reload an equipped weapon",
    "properties": ["Move action"],
    "requireTraining": false,
    "type": 1
  }
}
QuickMenuOptions.skills = {
  "Acrobatics": {
    "name": "Acrobatics",
    "img": "icons/skills/movement/feet-winged-boots-glowing-yellow.webp",
    "shortDescription": "Balance, tumble, escape",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Athletics": {
    "name": "Athletics",
    "img": "icons/skills/movement/figure-running-gray.webp",
    "shortDescription": "Climb, jump, swim",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Bluff": {
    "name": "Bluff",
    "img": "icons/magic/light/torch-fire-hand-orange.webp",
    "shortDescription": "Create diversion, feint, lie, pass secret message",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Intimidate": {
    "name": "Intimidate",
    "img": "icons/skills/social/intimidation-impressing.webp",
    "shortDescription": "Demoralize",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Medicine": {
    "name": "Medicine",
    "img": "icons/magic/life/crosses-trio-red.webp",
    "shortDescription": "First aid",
    "properties": [],
    "requireTraining": false,
    "type": 0
  },
  "Sleight of Hand": {
    "name": "Sleight of Hand",
    "img": "icons/skills/social/theft-pickpocket-bribery-brown.webp",
    "shortDescription": "Hide object, palm object",
    "properties": [],
    "requireTraining": "sle",
    "type": 0
  },
  "Stealth": {
    "name": "Stealth",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "shortDescription": "Hide, sniping",
    "properties": [],
    "requireTraining": false,
    "type": 0
  }
};
QuickMenuOptions.quickRoll = {
  "_skillCheck_": {
    "name": "Perform a skill check",
    "img": "icons/commodities/biological/organ-brain-pink-purple.webp",
    "shortDescription": "Lets you do a basic skill roll (e.g. Life Science, Perception)",
    "properties": [],
    "requireTraining": false,
    "type": 3
  },
  "_statCheck_": {
    "name": "Perform an ability check",
    "img": "systems/sfrpg/icons/spells/alter_corpse.webp",
    "shortDescription": "Lets you do a basic ability roll (e.g. Strength, Dexterity)",
    "properties": [],
    "requireTraining": false,
    "type": 4
  },
  "_save_": {
    "name": "Do a saving throw",
    "img": "systems/sfrpg/icons/spells/spirit_bound_armor.webp",
    "shortDescription": "Roll a fortitude, reflex or will save",
    "properties": [],
    "requireTraining": false,
    "type": 5
  },
  "_rollableTable_": {
    "name": "Roll against a preconfigured table",
    "img": "systems/sfrpg/icons/spells/share_language.webp",
    "shortDescription": "Required by some situations such as confusion",
    "properties": [],
    "requireTraining": false,
    "type": 6
  }
}
export default QuickMenuOptions;