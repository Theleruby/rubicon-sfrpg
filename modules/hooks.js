import { Rubicon } from "./rubicon.js";

(async() => {
  // hack: disable the compatibility warnings.
	console.log("Rubicon Hooks | Disabling compatibility warnings in Foundry")
  CONFIG.compatibility.mode = CONST.COMPATIBILITY_MODES.SILENT;
})();

Hooks.once("init", () => {
  // Set up the calendar
  const myCalendarConfig = {
    name: "Pact Standard Time",
    description: "Used in any place were the Pact Worlds hold sway",
    years: {
      yearZero: 0,
      firstWeekday: 0,
    },
    months: {
      values: [
          {name: "Abadius", abbreviation: "Jab", ordinal: 1, days: 31},
          {name: "Calistril", abbreviation: "Map", ordinal: 2, days: 28},
          {name: "Pharast", abbreviation: "May", ordinal: 3, days: 31},
          {name: "Gozran", abbreviation: "Jug", ordinal: 4, days: 30},
          {name: "Desnus", abbreviation: "Sep", ordinal: 5, days: 31},
          {name: "Sarenith", abbreviation: "Noc", ordinal: 6, days: 30},
          {name: "Erastus", abbreviation: "Noc", ordinal: 7, days: 31},
          {name: "Arodus", abbreviation: "Noc", ordinal: 8, days: 31},
          {name: "Rova", abbreviation: "Noc", ordinal: 9, days: 30},
          {name: "Lamashan", abbreviation: "Noc", ordinal: 10, days: 31},
          {name: "Neth", abbreviation: "Noc", ordinal: 11, days: 30},
          {name: "Kuthona", abbreviation: "Noc", ordinal: 12, days: 31}
      ]
    },
    days: {
      values: [
        {name: "Firstday", abbreviation: "Fir", ordinal: 1},
        {name: "Secondday", abbreviation: "Sec", ordinal: 2},
        {name: "Thirdday", abbreviation: "Thi", ordinal: 3},
        {name: "Fourthday", abbreviation: "Fou", ordinal: 4},
        {name: "Fifthday", abbreviation: "Fif", ordinal: 5},
        {name: "Sixthday", abbreviation: "Six", ordinal: 6, isRestDay: true},
        {name: "Seventhday", abbreviation: "Sev", ordinal: 7, isRestDay: true}
      ],
      daysPerYear: 365,
      hoursPerDay: 24,
      minutesPerHour: 60,
      secondsPerMinute: 60
    },
    seasons: {
      values: [
        {name: "Spring", monthStart: 3, monthEnd: 5},
        {name: "Summer", monthStart: 6, monthEnd: 8},
        {name: "Autumn", monthStart: 9, monthEnd: 11},
        {name: "Winter", monthStart: 12, monthEnd: 2}
      ]
    }
  };
  CONFIG.time.worldCalendarConfig = myCalendarConfig;
});

// Load the HUD and construct the app object
Hooks.once('ready', async function() {
	console.log("Rubicon Hooks | Loading HUD elements")
	let rubiconCharacterHudHtml = await renderTemplate("modules/rubicon-sfrpg/templates/character-hud.hbs", {});
	document.getElementById("ui-bottom").insertAdjacentHTML("afterbegin", rubiconCharacterHudHtml);
	let rubiconStarshipHudHtml = await renderTemplate("modules/rubicon-sfrpg/templates/starship-hud.hbs", {"crewArray": ["crew0", "crew1", "crew2", "crew3", "crew4", "crew5", "crew6", "crew7", "crew8"]});
	document.getElementById("ui-bottom").insertAdjacentHTML("afterbegin", rubiconStarshipHudHtml);
	let rubiconTimeHtml = await renderTemplate("modules/rubicon-sfrpg/templates/time-control.hbs", {});
	document.getElementById("ui-left-column-1").insertAdjacentHTML("beforeend", rubiconTimeHtml);
	game.rubicon = new Rubicon();
	console.log("Rubicon Hooks | Preloading actor images")
	// Preload the images
	var cache = document.createElement("CACHE");
	cache.style = "position:absolute;z-index:-1000;opacity:0;";
	document.body.appendChild(cache);
	game.actors.forEach((actor) => {
		// 1
		var target = actor.img;
		if (target) {
			console.log(`Rubicon Hooks | Preloading ${actor.name} root image: ${target}`);
			var img = new Image();
			img.src = target;
			img.style = "position:absolute";
			cache.appendChild(img);
		}
		target = actor?.system?.details?.biography?.fullBodyImage;
		if (target) {
			console.log(`Rubicon Hooks | Preloading ${actor.name} full body image: ${target}`);
			var img = new Image();
			img.src = target;
			img.style = "position:absolute";
			cache.appendChild(img);
		};
	});
	// Update time
	game.rubicon.updateTimeControls();
	console.log("Rubicon Hooks | Initialized successfully")
});

/* No longer required.
// Fixes the bug where the chat card ends up with the wrong information printed on the first turn
Hooks.on("combatStart", function() {
  console.log("Rubicon Hooks | Combat round and turn corrected");
  game.combat.round = 1;
  game.combat.turn = 0;
  game.combat.current.turn = 0;
});
*/

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
    if (game.combat.combatant?.isOwner || game.combat.combatant?.token.permission === 3) {  // combatant might be null during starship combat if it's a shared turn
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
  const whisper = doc.whisper || doc.data?.whisper;
  if (whisper && whisper.length > 0) {
    return;
  }
  //console.log(doc);
  if (doc.flags?.sfrpg?.item) {
    // get the item and find out if it's a spell being cast by an NPC.
    let item = await fromUuid(doc.flags.sfrpg.item);
    //console.log(item);
    if (item.type === "spell" && item.actor.type === "npc2") {
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

Hooks.on("updateWorldTime", (worldTime, dt) => {
  console.log(`Rubicon Hooks | Update world time ${worldTime} ${dt}`);
  game.rubicon.updateTimeControls();
});

Hooks.on("combatStart", function() {
  console.log("Rubicon Hooks | Starting a combat session")
});

// Disable all timed effects directly linked to feats that are still active when combat ends
Hooks.on("deleteCombat", function(combat) {
    console.log("Rubicon Hooks | Cleaning up a combat session")
    if (game.user?.isGM) {
      combat.combatants.forEach((combatant) => {
        combatant.actor.items.forEach((item) => {
          if (item?.type === "weapon" && item?.system?.weaponType === "grenade" && item?.system?.capacity?.value === 0) {
            console.log(`Rubicon Hooks | Deleting used ${item.name} from ${combatant.actor.name}`);
            item.delete();
          }
        });
      });
    };
});

Hooks.on("itemActivationChanged", function(evt) {
    //console.log(evt.actor)
    //console.log(evt.item)
    //console.log(evt.isActive)
    // is this explicitly forbidden from being activated? if so, ignore.
    // (requires sfrpg patch)
    /*
    if (evt.isActive && !evt.item.shouldHaveActivationToggled()) { //!evt.item?.system?.activation?.condition === "ignore") {
      //evt.item.update({"system.isActive": false});
      return;
    }
    */
    // check to see if there's a matching linked effect. if there is, we enable it
    let x = evt.actor.items.find((i)=>i.type=="effect" && i.originItem?.uuid === evt.item.uuid)
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
    if (item.type === "effect" && changes?.system?.enabled !== undefined && changes?.system?.enabled !== null) {
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
    let x = evt.actor.items.find((i)=>i.type=="effect" && i.originItem?.uuid === evt.item.uuid)
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

Hooks.on("calculateSaveDC", function(data) {
  if (["character", "drone"].includes(data.actor?.type)) {
    if (data.item?.type === "weapon" && data.item?.system?.weaponType === "grenade") {
      if (data.actor?.items?.getName("Grenade Mastery (Combat)")) {
        // GRENADE MASTERY
        let baseAttackBonus = data.actor.system.attributes.baseAttackBonus.value;
        let grenadeItemLevel = data.item.system.level;
        let grenadeSaveBonus = ((grenadeItemLevel + 5) <= baseAttackBonus) ? 2 : 1;
        console.log(`Rubicon Hooks | Grenade Mastery: Amending reflex save of ${data.item.name} owned by ${data.actor.name} (bonus: +${grenadeSaveBonus})`);
        data.formula.dcFormula = `${data.formula.dcFormula} + ${grenadeSaveBonus}`;
      }
    }
  }
});

