const RubiconActions = {};
RubiconActions.combatManeuvers = {
  /*==================================*/
  // combat maneuvers
  /*==================================*/
  "bullRush": {
    "img": "icons/skills/movement/ball-spinning-blue.webp",
    "name": "Bull Rush",
    "allowItem": 0, // no
    "actionType": "Standard",
    "shortDescription": "Knock back a target",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": "kac8",
    "requireTraining": false,
    "description": "<p>As a standard action, you can move at up to your speed and then attempt to knock back a target. If you move, all movement must be directly toward the designated opponent, though diagonal movement is allowed. You must also have a clear path toward the opponent, and you must move to the space closest to your starting square from which you can attack the opponent. You can’t move any farther after reaching the opponent.</p><p>Once you are within reach, make a melee attack roll against KAC + 4. If successful, you knock the target back 5 feet, plus 5 additional feet for every 5 by which the result of your attack roll exceeds the target's KAC + 4. If an obstacle is in the way, the target stops at the obstacle instead.</p><p>If you move more than half your speed, you take the same penalties as if you had charged (normally a –2 penalty to the attack roll and a –2 penalty to your AC until the start of your next turn). Some classes, including solarian and soldier, grant abilities that modify attacks made on charges; if your class has an ability which modifies the penalties for a charge, use the modified penalties instead.</p>",
    "properties": ["Standard action", "Combat maneuver", "Melee"],
    "hasItemButtons": [
      //{ name: "Bull Rush", action: "rollAttack", value: "", target: "kac8", content: "Attack", special: "" },
    ],
    "hasNoItemButtons": [
      { name: "Bull Rush", action: "rollAttack", value: "mwak", target: "kac8", content: "Attack", special: "" },
    ]
  },
  "dirtyTrick": {
    "img": "icons/skills/wounds/injury-face-impact-orange.webp",
    "name": "Dirty Trick",
    "allowItem": 0, // no
    "actionType": "Standard",
    "shortDescription": "An unorthodox attack that can briefly hinder an opponent",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": "kac8",
    "requireTraining": false,
    "description": "<p>As a standard action, you can attempt an unorthodox attack to briefly hinder an opponent. This could be throwing sand in the target's eyes, jamming a rock into its actuators, or any other improvised action designed to put your opponent at a disadvantage.</p><p>Choose an opponent within your reach and then make a melee attack roll against KAC + 4. If successful, your target becomes blinded, deafened, entangled, off-target, shaken, or sickened (your choice) for 1 round, plus 1 additional round for every 5 by which the result of your attack roll exceeds the target's KAC + 4. The target can remove the condition as a move action.</p><p>A dirty trick is normally a melee attack, but a GM can allow certain actions to count as dirty tricks at range, in which case you take a –2 penalty to your attack roll for every 5 feet between you and the target.</p>",
    "properties": ["Standard action", "Combat maneuver", "Melee"],
    "hasItemButtons": [
      //{ name: "Dirty Trick", action: "rollAttack", value: "", target: "kac8", content: "Attack", special: "" },
    ],
    "hasNoItemButtons": [
      { name: "Dirty Trick", action: "rollAttack", value: "mwak", target: "kac8", content: "Attack", special: "" },
      //{ name: "Dirty Trick (Ranged)", action: "rollAttack", value: "rwak", target: "kac8", content: "Ranged Attack", special: "" },
    ]
  },
  "disarm": {
    "img": "icons/skills/melee/sword-damaged-broken-glow-red.webp",
    "name": "Disarm",
    "allowItem": 1, // required
    "actionType": "Standard",
    "shortDescription": "Knock an item a target is holding out of their hands",
    "buttonComment": "Melee weapon attack",
    "itemActionTypes": ["mwak"],
    "itemSpecialTarget": "kac8",
    "requireTraining": false,
    "description": "<p>As a standard action, you can attempt to knock an item a target is holding out of the target's hands and onto the ground.</p><p>Choose an opponent within your reach and then make a melee attack roll against KAC + 4. If successful, the target lets go of the item. If you have a hand free, you can automatically grab the item with your hand before it falls.</p>",
    "properties": ["Standard action", "Combat maneuver", "Melee"],
    "hasItemButtons": [
      { name: "Disarm", action: "rollAttack", value: "", target: "kac8", content: "Attack", special: "" },
    ],
    "hasNoItemButtons": [
      //{ name: "Disarm", action: "rollAttack", value: "mwak", target: "kac8", content: "Attack", special: "" },
    ]
  },
  "grapple": {
    "img": "icons/skills/melee/unarmed-punch-fist-yellow-red.webp",
    "name": "Grapple",
    "allowItem": 10, // unarmed strike or grapple weapons only
    "actionType": "Standard",
    "shortDescription": "Hold a target in place",
    "buttonComment": "Requires a free hand or grapple weapon",
    "itemActionTypes": ["mwak"],
    "itemSpecialTarget": "kac8",
    "requireTraining": false,
    "description": "<p>As a standard action, you can attempt to hold a target in place. To perform a grapple combat maneuver, you must have at least one hand free, or have a weapon with the Grapple property equipped.</p><p>Choose an opponent within your reach and then make a melee attack roll against KAC + 4. If successful, your target gains the grappled condition, meaning she can't move from her current space and takes further penalties until she either uses a standard action to attempt a grapple combat maneuver to grapple you (giving you the grappled condition) or uses the escape task of the Acrobatics skill to break free.</p><p>If the result of your attack roll equals or exceeds the target's KAC + 13, the target is instead pinned for the same duration, and she can't take any actions that involve moving her limbs other than to attempt to escape.</p><p>The grappled or pinned condition lasts until the end of your next turn, unless you renew it on your next turn with another grapple combat maneuver. The condition ends immediately if you move away.</p><p>As long as you have one target grappled or pinned, you cannot attempt to grapple another.</p><p>When you renew a grapple, you can remove one item from the target's body that can be easily accessed, including most weapons and equipment (but not worn armor). Doing so immediately ends the grapple.</p>",
    "properties": ["Standard action", "Combat maneuver", "Melee"],
    "hasItemButtons": [
      { name: "Grapple", action: "rollAttack", value: "", target: "kac8", content: "Attack", special: "" },
    ],
    "hasNoItemButtons": [
    ]
  },
  "reposition": {
    "img": "icons/skills/movement/feet-bladed-boots-fire.webp",
    "name": "Reposition",
    "allowItem": 1, // required.  need to check the reposition items
    "actionType": "Standard or Full",
    "shortDescription": "Reposition a target",
    "buttonComment": "Melee weapon attack",
    "itemActionTypes": ["mwak"],
    "itemSpecialTarget": "kac8",
    "requireTraining": false,
    "description": "<p>As a standard action, you can attempt to reposition a target.</p><p>Choose an opponent within your reach and then make a melee attack roll against KAC + 4. If successful, you can change the target's position to a different location still within your reach and within 5 feet of its original placement. You can move the target 5 additional feet for every 5 by which the result of your attack roll exceeds the target's KAC + 4, but all movement must remain within your reach. You cannot move the target past an obstacle.</p><p>You may instead choose to reposition a creature as a full action. If you do this, you can move a distance equal to the distance you repositioned your target (up to your move speed), dragging the target along with you.</p>",
    "properties": ["Standard or Full action", "Combat maneuver", "Melee"],
    "hasItemButtons": [
      { name: "Reposition", action: "rollAttack", value: "", target: "kac8", content: "Attack", special: "" },
    ],
    "hasNoItemButtons": [
    ]
  },
  "sunder": {
    "img": "icons/skills/melee/sword-damaged-broken-blue.webp",
    "name": "Sunder",
    "allowItem": 1, // required.  need to check the sunder items
    "actionType": "Standard",
    "shortDescription": "Damage an opponent's held item",
    "buttonComment": "Melee weapon attack",
    "itemActionTypes": ["mwak"],
    "itemSpecialTarget": "kac8",
    "requireTraining": false,
    "description": "<p>As a standard action, you can attempt to deal damage to an item held in a target's hand or accessible on its body.</p><p>Choose an opponent within your reach and then make a melee attack roll against KAC + 4. If successful, you deal damage using your chosen melee weapon as normal. The object must be something that could be drawn easily by the target as a move action. The damage is reduced by an amount equal to the object's hardness.</p><p>More details can be found on pages 247 and 409 of the Core Rulebook.</p>",
    "properties": ["Standard action", "Combat maneuver", "Melee"],
    "hasItemButtons": [
      { name: "Sunder", action: "rollAttack", value: "", target: "kac8", content: "Attack", special: "" },
      { name: "Sunder", action: "rollDamage", value: "", target: "", content: "Damage", special: "" },
    ],
    "hasNoItemButtons": [
    ]
  },
  "trip": {
    "img": "icons/skills/movement/arrow-down-pink.webp",
    "name": "Trip",
    "allowItem": 1, // required.  need to check the trip items
    "actionType": "Standard",
    "shortDescription": "Make a target trip over",
    "buttonComment": "Melee weapon attack",
    "itemActionTypes": ["mwak"],
    "itemSpecialTarget": "kac8",
    "requireTraining": false,
    "description": "<p>As a standard action, you can attempt to make a target trip over.</p><p>Choose an opponent within your reach and then make a melee attack roll against KAC + 4. If successful: A target on the ground is knocked prone. A target in the air descends 10 feet, falling prone if this causes it to fall to the ground. A target in zero gravity is knocked off-kilter.</p>",
    "properties": ["Standard action", "Combat maneuver", "Melee"],
    "hasItemButtons": [
      { name: "Trip", action: "rollAttack", value: "", target: "kac8", content: "Attack", special: "" },
    ],
    "hasNoItemButtons": [
    ]
  }
}
RubiconActions.specialAttacks = {
  /*==================================*/
  // standard actions
  /*==================================*/
  "coveringFire": {
    "img": "icons/weapons/bows/shortbow-recurve-blue.webp",
    "name": "Covering Fire",
    "allowItem": 1, // required
    "actionType": "Standard",
    "shortDescription": "Make it harder for an opponent to hit an ally",
    "buttonComment": "Ranged weapon attack",
    "itemActionTypes": ["rwak"],
    "itemSpecialTarget": undefined,
    "itemSpecialTarget": "ac15",
    "requireTraining": false,
    "description": "<p>You can use your standard action to make a ranged attack that provides covering fire for an ally.</p><p>Make a ranged attack roll against AC 15. If you hit, you deal no damage, but the selected ally gains a +2 circumstance bonus to AC against the next attack from a creature in your line of effect (see page 271), so long as that attack occurs before your next turn.</p>",
    "properties": ["Standard action", "Non-damaging attack", "Ranged"],
    "hasItemButtons": [
      { name: "Covering Fire", action: "rollAttack", value: "", target: "ac15", content: "Attack", special: "" },
    ],
    "hasNoItemButtons": [
    ]
  },
  "harryingFire": {
    "img": "icons/weapons/bows/shortbow-white.webp",
    "name": "Harrying Fire",
    "allowItem": 1, // required
    "actionType": "Standard",
    "shortDescription": "Make it easier for an ally to hit an opponent",
    "buttonComment": "Ranged weapon attack",
    "itemActionTypes": ["rwak"],
    "itemSpecialTarget": "ac15",
    "requireTraining": false,
    "description": "<p>You can use your standard action to make a ranged attack that distracts a foe in your line of effect.</p><p>Make an attack roll against AC 15. If you hit, you deal no damage, but the next ally to attack that foe gains a +2 circumstance bonus to their next attack roll, as long as that attack occurs before your next turn.</p>",
    "properties": ["Standard action", "Non-damaging attack", "Ranged"],
    "hasItemButtons": [
      { name: "Harrying Fire", action: "rollAttack", value: "", target: "ac15", content: "Attack", special: "" },
    ],
    "hasNoItemButtons": [
    ]
  },
  /*==================================*/
  // full actions
  /*==================================*/
  "charge": {
    "img": "icons/magic/sonic/projectile-shock-wave-blue.webp",
    "name": "Charge",
    "allowItem": 1, // required
    "actionType": "Full",
    "shortDescription": "Charge in at high speed and attack",
    "buttonComment": "Melee weapon attack",
    "itemActionTypes": ["mwak"],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As a full action, you can move at up to double your speed and then make a melee attack at the end of the movement. You can draw a weapon during a charge attack if your base attack bonus is at least +1.</p><p>Charging carries tight restrictions on how you can move. You must move at least 10 feet (2 squares), and all movement must be directly toward the designated opponent, though diagonal movement is allowed. You must have a clear path toward the opponent, and you must move to the space closest to your starting square from which you can attack the opponent. If this space is occupied or blocked, you can’t charge. If any line from your starting space to the ending space passes through a square that blocks movement, slows movement (such as difficult terrain), or contains a creature (even an ally), you can’t charge. You can still move through helpless creatures during a charge. If you don’t have line of sight (see page 271) to the opponent at the start of your turn, you can’t charge that opponent.</p><p><strong>Attacking on a Charge:</strong> After moving, you can make a single melee attack. You take a –2 penalty to the attack roll and a –2 penalty to your AC until the start of your next turn. You can’t move any farther after the attack. Some classes, including solarian and soldier, grant abilities that modify attacks made on charges.</p>",
    "properties": ["Full action", "Full turn attack", "Melee"],
    "hasItemButtons": [
      { name: "Charge", action: "rollAttack", value: "", target: "", content: "Attack ", special: "" },
      { name: "Charge", action: "rollDamage", value: "", target: "", content: "Damage", special: "" }
    ],
    "hasNoItemButtons": [
    ]
  },
  "coupDeGrace": {
    "img": "icons/magic/sonic/explosion-impact-shock-wave.webp",
    "name": "Coup De Grace",
    "allowItem": 1, // required
    "actionType": "Full",
    "shortDescription": "Deliver a final blow to a helpless opponent",
    "buttonComment": "Melee weapon attack",
    "itemActionTypes": ["mwak"],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As a full action, you can deliver a special attack called a coup de grace to an adjacent helpless opponent. You automatically hit and score a critical hit. If the target survives the damage, they must succeed at a Fortitude saving throw (DC = 10 + your level or CR) or die. However, if the target is immune to critical hits, the coup de grace does not deal critical damage or effects, nor does it force the target to succeed at a saving throw or die.</p>",
    "properties": ["Full action", "Full turn attack", "Melee"],
    "hasItemButtons": [
      { name: "Coup De Grace", action: "rollAttack", value: "", target: "", content: "Attack (to drain ammo, if needed)", special: "" },
      { name: "Coup De Grace", action: "rollDamage", value: "", target: "", content: "Damage", special: "" },
      { name: "Coup De Grace", action: "rollSave", value: "fort", target: "", content: "Roll Fortitude Save", special: "" },
    ],
    "hasNoItemButtons": [
    ]
  },
  "fullAttack": {
    "img": "icons/magic/control/debuff-chains-red.webp",
    "name": "Full Attack",
    "allowItem": 0, // no
    "actionType": "Full",
    "shortDescription": "Attack twice, with a penalty to each attack",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>You can spend a full action to make two attacks, each with a –4 penalty to the attack rolls. These attacks can be made with the same weapon or different weapons, though certain weapons have a firing speed so slow that you can’t shoot them more than once in a round, even with a full attack. These weapons have the unwieldy special property (see page 182).</p><p>Certain weapons have special individualized full attacks. For instance, some weapons have a fully automatic attack mode. Sometimes special full attacks, such as the soldier’s onslaught class feature, require specialized training in order to gain their benefits.</p>",
    "properties": ["Full action", "Full turn attack"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Full Attack", action: "doAttack", value: "", target: "", content: "Open Quick Menu: Basic attack", special: "" },
    ]
  }
}
RubiconActions.defendActions = {
  "fightDefensively": {
    "img": "icons/magic/defensive/shield-barrier-flaming-pentagon-blue-yellow.webp",
    "name": "Fight Defensively",
    "allowItem": 0, // no
    "actionType": "Free",
    "shortDescription": "Take an attack penalty to gain a small AC bonus",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>Your may choose to fight defensively this turn. If you do so, you take a –4 penalty to all attacks in that round (in addition to the normal penalties for making a full attack, if you make one) to gain a +2 bonus to your AC until the start of your next turn.</p>",
    "properties": ["Free action", "Defensive action"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "totalDefense": {
    "img": "icons/magic/defensive/shield-barrier-glowing-blue.webp",
    "name": "Total Defense",
    "allowItem": 0, // no
    "actionType": "Standard",
    "shortDescription": "Greatly increase your AC until your next turn",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>You can defend yourself as a standard action.</p><p>Starting at the beginning of this action, you get a +4 bonus to your Armor Class until the start of your next turn. You can’t combine total defense with other actions that increase your AC, nor can you make attacks of opportunity while benefiting from total defense.</p>",
    "properties": ["Standard action", "Defensive action"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  }
}
RubiconActions.movement = {
  "move": {
    "img": "icons/magic/movement/trail-streak-impact-blue.webp",
    "name": "Move Your Speed",
    "allowItem": 0, // no
    "actionType": "Move",
    "shortDescription": "Move at up to your speed",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>The simplest move action is moving up to your speed (see Speed on page 255 for more information).</p><p>Many nonstandard modes of movement are also covered under this action, including burrowing (using your natural burrow speed, if you have one), climbing and swimming (using either the Athletics skill or your natural climb or swim speed, if you have one), or flying (using the Acrobatics skill if you have either access to flight or a natural fly speed). See Additional Movement Types on page 258 for more details.</p><p>Some full actions (such as the operative’s trick attack) allow you to move as well, which act as moving up to your speed.</p>",
    "properties": ["Move action", "Movement"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "crawl": {
    "img": "icons/magic/control/silhouette-fall-slip-prone.webp",
    "name": "Crawl",
    "allowItem": 0, // no
    "actionType": "Move",
    "shortDescription": "Crawl while prone",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>You can crawl 5 feet as a move action. A crawling character is considered prone.</p>",
    "properties": ["Move action", "Movement"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "guardedStep": {
    "img": "icons/magic/control/silhouette-grow-shrink-blue.webp",
    "name": "Guarded Step",
    "allowItem": 0, // no
    "actionType": "Move",
    "shortDescription": "Step 5 feet without provoking an attack of opportunity",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>You can carefully step 5 feet as a move action. This movement doesn’t provoke attacks of opportunity (see page 248), even if you’re in a threatened square (see page 255).</p>",
    "properties": ["Move action", "Movement"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "run": {
    "img": "icons/magic/control/debuff-energy-snare-purple-pink.webp",
    "name": "Run",
    "allowItem": 0, // no
    "actionType": "Full",
    "shortDescription": "Full action that lets you run away with an AC penalty",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>You can run as a full action. When you run, you can move up to four times your speed in a straight line. You gain the flat-footed condition, and you can’t run if you must cross difficult terrain or can’t see where you’re going. Running provokes attacks of opportunity. You can run for a number of rounds equal to your Constitution score. See page 258 for information on long-distance running.</p>",
    "properties": ["Full action", "Movement"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "withdraw": {
    "img": "icons/magic/control/silhouette-grow-shrink-tan.webp",
    "name": "Withdraw",
    "allowItem": 0, // no
    "actionType": "Full",
    "shortDescription": "Full action that lets you withdraw from melee combat",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>Withdrawing from melee combat is a full action. When you withdraw, you can move up to double your speed. The square you start out in is not considered threatened by any opponent you can see, and therefore visible enemies don’t get to make attacks of opportunity against you when you move from that square. Unseen enemies still get attacks of opportunity against you, and you can’t withdraw from combat if you’re blinded and have no other precise senses (such as blindsight). If, during the process of withdrawing, you move out of a threatened square other than the one you in which started, enemies can make attacks of opportunity as normal. See page 248 for more information.</p>",
    "properties": ["Full action", "Movement"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  }
}
RubiconActions.acrSkill = {
  /*==================================*/
  // acrobatics
  /*==================================*/
  "balance": {
    "img": "icons/skills/movement/feet-winged-boots-blue.webp",
    "name": "Balance",
    "allowItem": 0, // no
    "actionType": "Part of a move",
    "shortDescription": "Move safely across narrow surfaces and uneven ground",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As part of a move, you can use Acrobatics to move across narrow surfaces and uneven ground without falling.</p><p>A successful check allows you to move at half your land speed across such a surface. While balancing, you are flat-footed. If you fail the Acrobatics check to begin moving across a narrow surface or uneven ground, your move action ends at the point just before you'd need to begin balancing. If you fail the check while already balancing (having succeeded on a previous turn), you fall prone and the GM may rule that you start falling, depending on the type of surface you are moving across.</p><p>If you take damage while balancing, you must immediately attempt an Acrobatics check at the initial DC. On a success, you remain balancing (and can continue to move if it is your turn). If you fail, you fall prone and, depending on the type of surface you are balancing upon, the GM can rule that you start falling.</p><p>You can't take 20 on Acrobatics checks to balance.</p><p>The DCs for Acrobatics checks to balance are based on the width of the surface you are traversing, but can also be adjusted based on environmental circumstances such as slope and surface conditions. Such modifiers are cumulative; use all that apply. (See CRB page 135).</p>",
    "properties": ["Part of a move", "Acrobatics", "Movement"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Balance", action: "rollSkill", value: "acr", target: "", content: "Roll Acrobatics Check", special: "" },
    ]
  },
  "tumble": {
    "img": "icons/skills/movement/feet-spurred-boots-brown.webp",
    "name": "Tumble",
    "allowItem": 0, // no
    "actionType": "Move or Full",
    "shortDescription": "Move safely through a threatened space",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As long as you do not have the encumbered or overburdened condition (see pages 275–276), you can use Acrobatics to move through a space threatened by an enemy or enemies without provoking attacks of opportunity from them.</p><p>Tumbling is normally a move action, and you move at half speed. You can alternatively tumble while prone, but this uses a full action, you can move only 5 feet, and you take a –5 penalty to the check.</p><p>The DC to move through an opponent's threatened area is 15 + 1-1/2 × the opponent's CR. If multiple opponents are threatening the same space, you attempt one check with a DC based on the opponent with the highest CR, and the DC increases by 2 for each additional opponent beyond the first.</p><p>You can also tumble directly through an opponent's space; the DC is 20 + 1-1/2 × the opponent's CR. If you fail this check, you stop moving adjacent to your opponent and provoke an attack of opportunity.</p><p>If you attempt to move through multiple threatened spaces or opponents' spaces during the same round, you must succeed at a check for each space, and the DC of each check beyond the first increases by 2. For example, if you tumble through a space threatened by two CR 1 creatures and a CR 2 creature, the DC = 15 + 3 + 2 + 2 = 22. If you then tumble through the space of the CR 2 creature, the DC = 20 + 3 + 2 = 25.</p><p>In all of these cases, the DC is modified by the same environmental circumstances that apply to the balance task of Acrobatics (see page 135).</p><p>If you fail the check, you provoke attacks of opportunity as normal.</p><p>If you want to move at full speed while tumbling, you take a –10 penalty to the check.</p>",
    "properties": ["Move or Full action", "Acrobatics"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Tumble", action: "rollSkill", value: "acr", target: "", content: "Roll Acrobatics Check", special: "" },
    ]
  },
  "escape": {
    "img": "icons/skills/movement/feet-winged-boots-brown.webp",
    "name": "Escape",
    "allowItem": 0, // no
    "actionType": "Standard",
    "shortDescription": "Escape from grapples, pins, and restraints",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>You can use Acrobatics to escape from grapples, pins, and restraints.</p><p>Attempting to escape from a grapple or pin is a standard action. On a success, you free yourself from the grapple or pin and no longer have the grappled or pinned condition. The DC to escape a grapple or pin is typically 10 + the grappler's Kinetic Armor Class.</p><p>Escaping from restraints can take 1 minute or more, depending on the type of restraint. The DC to escape from restraints is based on the nature of the restraints and sometimes the CR of the creature that did the binding (see the table on CRB pg 135).</p><p>You can take 20 on Acrobatics checks to escape from most restraints, but not on checks to escape grapples.</p>",
    "properties": ["Standard action", "Acrobatics"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Escape", action: "rollSkill", value: "acr", target: "", content: "Roll Acrobatics Check", special: "" },
    ]
  }
}
RubiconActions.athSkill = {
  /*==================================*/
  // athletics
  /*==================================*/
  "climb": {
    "img": "icons/skills/movement/arrows-up-trio-red.webp",
    "name": "Climb",
    "allowItem": 0, // no
    "actionType": "Part of a move",
    "shortDescription": "Climb a slope, a wall, or another steep incline",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As part of a move, you can use Athletics to climb up, down, or across a slope, a wall, or another steep incline. You can even climb on a ceiling, provided it has handholds, but you cannot climb on a perfectly smooth surface.</p><p>On a successful check, you move at half your land speed across such a surface. If you fail the check by 4 or less, you make no progress. If you fail by 5 or more, you fall.</p><p>You can't take 20 on an Athletics check to climb.</p><p>You need at least two hands to climb, but you can cling to a wall with one hand while you cast a spell, shoot a small arm, or take some other action that takes only one hand.</p><p>While climbing or clinging to a wall, you are flat-footed.</p><p>If you have a climb speed (see page 259), you receive a +8 bonus to Athletics checks to climb and don't need to attempt Athletics checks to climb except in hazardous circumstances.</p><p>The DCs for Athletics checks to climb are based on the object being climbed, but can also be adjusted based on environmental circumstances such as gravity, winds, and surface conditions. Such modifiers are cumulative; use all that apply. (See CRB pg 136).</p>",
    "properties": ["Part of a move", "Athletics", "Movement"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Climb", action: "rollSkill", value: "ath", target: "", content: "Roll Athletics Check", special: "" },
    ]
  },
  "jump": {
    "img": "icons/skills/movement/arrow-upward-blue.webp",
    "name": "Jump",
    "allowItem": 0, // no
    "actionType": "Part of a move",
    "shortDescription": "Horizontally or vertically jump a distance",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As part of a move, you can use Athletics to horizontally or vertically jump a distance no greater than your remaining amount of movement. If you take a 10-foot running start just prior to the jump attempt, the DC is equal to the number of feet you are attempting to jump horizontally, or four times the number of feet you are attempting to jump vertically.</p><p>If you do not take a running start, the DC of the check doubles. The DC is modified by the same environmental circumstances that apply to Acrobatics checks to balance (see page 135). If you fail the check, you fall. If you fail by 5 or more, you fall prone even if you don't take any damage from the fall. Creatures with a land speed of 35 feet or more gain a +4 bonus to Athletics checks to jump. This bonus increases by 4 for every 10 by which a creature's land speed exceeds 40 feet. You can't take 20 on Athletics checks to jump.</p>",
    "properties": ["Part of a move", "Athletics", "Movement"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Jump", action: "rollSkill", value: "ath", target: "", content: "Roll Athletics Check", special: "" },
    ]
  },
  "swim": {
    "img": "icons/environment/wilderness/island.webp",
    "name": "Swim",
    "allowItem": 0, // no
    "actionType": "Part of a move",
    "shortDescription": "Swim through water and similar fluids",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As part of a move, you can use Athletics to swim. On a successful check, you move half your land speed through water and similar fluids. If you fail the check by 4 or less, you make no progress. If you fail by 5 or more, you sink beneath the surface or sink deeper, and you must hold your breath or begin drowning (see page 404).</p><p>If you do not have a swim speed (see page 259), for each hour you swim, you must succeed at a DC 20 Athletics check or take 1d6 nonlethal damage from fatigue. If you have a swim speed, you receive a +8 bonus to all Athletics checks to swim and don't need to attempt Athletics checks to swim except in hazardous circumstances.</p><p>The DCs for Athletics checks to swim are based on the prevailing conditions, but can also be adjusted based on environmental circumstances such as currents or the presence of debris. Such modifiers are cumulative; use all that apply. (See CRB page 137).</p>",
    "properties": ["Part of a move", "Athletics", "Movement"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Swim", action: "rollSkill", value: "ath", target: "", content: "Roll Athletics Check", special: "" },
    ]
  }
}
RubiconActions.bluSkill = {
  /*==================================*/
  // bluff
  /*==================================*/
  "createDiversion": {
    "img": "icons/magic/control/control-influence-puppet.webp",
    "name": "Create Diversion",
    "allowItem": 0, // no
    "actionType": "Move",
    "shortDescription": "Create a diversion to hide or palm an object",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As a move action, you can use Bluff to create a diversion. Your Bluff check is opposed by the Sense Motive check of the creature you are attempting to beguile.</p><p>If you succeed, you can either attempt the Hide task of Stealth as if you started with cover or concealment, or attempt the Palm Object task of Sleight of Hand with a +10 bonus (your choice).</p><p>Occasionally, your Bluff check might be opposed by several creatures (for instance, if you are on a crowded space station promenade); in such cases, the GM might decide to roll several Sense Motive checks, and you succeed only against creatures with Sense Motive results lower than your Bluff result.</p>",
    "properties": ["Move action", "Bluff"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Create Diversion", action: "rollSkill", value: "blu", target: "", content: "Roll Bluff Check", special: "" },
      { name: "Create Diversion", action: "rollSkill", value: "sen", target: "", content: "Roll Sense Motive Check", special: "" },
    ]
  },
  "feint": {
    "img": "icons/magic/movement/trail-streak-zigzag-yellow.webp",
    "name": "Feint",
    "allowItem": 0, // no
    "actionType": "Standard",
    "shortDescription": "Perform a distracting movement at an opponent",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>You can use your standard action to perform a distracting movement at an opponent by attempting a Bluff check. The DC of this check is equal to either 10 + your opponent's Sense Motive total skill bonus or 15 + 1-1/2 × the opponent's CR, whichever is greater.</p><p>You can't feint against a creature that lacks an Intelligence score, and you cannot take 10 or take 20 on a Bluff check to feint.</p><p>When you successfully feint, you treat your opponent as flat-footed for your next attack against them before the end of your next turn.</p>",
    "properties": ["Standard action", "Bluff"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Feint", action: "rollSkill", value: "blu", target: "", content: "Roll Bluff Check", special: "" },
      { name: "Feint", action: "rollSkill", value: "sen", target: "", content: "Roll Sense Motive Check", special: "" },
    ]
  },
  "lie": {
    "img": "icons/magic/control/mouth-smile-deception-purple.webp",
    "name": "Lie",
    "allowItem": 0, // no
    "actionType": "Combat banter or Full",
    "shortDescription": "Deceive someone or tell a convincing lie",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>You can use Bluff to deceive someone or tell a convincing lie.</p><p>A quick, simple lie in combat is part of combat banter; otherwise, telling a lie is at least a full action, but it can take longer if the lie is elaborate, as determined by the GM.</p><p>If the creature is suspicious or attending carefully to your lie (as per the Detect Deception task of Sense Motive), the check is opposed by the Sense Motive check of the creature you are lying to; otherwise, the DC of this check is equal to 10 + the creature's total Sense Motive skill bonus.</p><p>If you succeed, the creature you are lying to believes you are telling the truth, at least until confronted with evidence to the contrary. The GM may determine that some lies are so improbable that it is impossible to convince someone they are true.</p><p>The DCs for Bluff checks to lie are adjusted based on the target's initial attitude toward you (see Diplomacy on page 139) as well as other circumstances determined by the GM (such as the plausibility of the lie).</p>",
    "properties": ["Combat banter", "Bluff"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Lie", action: "rollSkill", value: "blu", target: "", content: "Roll Bluff Check", special: "" },
      { name: "Lie", action: "rollSkill", value: "sen", target: "", content: "Roll Sense Motive Check", special: "" },
    ]
  },
  "passSecretMessage": {
    "img": "icons/sundries/documents/envelope-sealed-red-tan.webp",
    "name": "Pass Secret Message",
    "allowItem": 0, // no
    "actionType": "Combat banter",
    "shortDescription": "Pass a secret message to an ally",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>You can use Bluff to pass a secret message to an ally without others understanding the message's true meaning. Doing so in combat is part of combat banter. The DC of this check is 15 for simple messages and 20 for more complex messages, as determined by the GM.</p><p>Those overhearing the message can attempt an opposed Sense Motive check to learn the gist of the message.</p><p>You cannot take 20 on a Bluff check to pass a secret message.</p>",
    "properties": ["Combat banter", "Bluff"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Pass Secret Message", action: "rollSkill", value: "blu", target: "", content: "Roll Bluff Check", special: "" },
      { name: "Pass Secret Message", action: "rollSkill", value: "sen", target: "", content: "Roll Sense Motive Check", special: "" },
    ]
  }
}
RubiconActions.intSkill = {
  /*==================================*/
  // intimidate
  /*==================================*/
  "demoralize": {
    "img": "icons/magic/unholy/silhouette-evil-horned-giant.webp",
    "name": "Demoralize",
    "allowItem": 0, // no
    "actionType": "Standard",
    "shortDescription": "Make a creature shaken for a number of rounds",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As a standard action, you can use Intimidate to cause a creature within 30 feet of you to become shaken for a number of rounds.</p><p>This is a sense-dependent ability. The DC of this check is equal to either 10 + your opponent's total Intimidate skill bonus, or 15 + 1-1/2 × the opponent's CR, whichever is greater. If you succeed, the target is shaken for 1 round. The duration increases by 1 round for every 5 by which the result of your check exceeds the DC.</p>",
    "properties": ["Standard action", "Intimidate"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Demoralize", action: "rollSkill", value: "int", target: "", content: "Roll Intimidate Check", special: "" },
    ]
  }
}
RubiconActions.medSkill = {
  /*==================================*/
  // medicine
  /*==================================*/
  "firstAid": {
    "img": "icons/skills/wounds/injury-stapled-flesh-tan.webp",
    "name": "First Aid",
    "allowItem": 0, // no
    "actionType": "Standard",
    "shortDescription": "Stop bleed damage or stabilize a creature",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As a standard action, you can use Medicine to stop bleed damage or administer first aid to a dying creature that you can touch. The DC of this check is 15.</p><p>If you succeed at the check, the creature stops dying and becomes stable, or the bleed damage ends.</p><p>Unlike with other tasks of the Medicine skill, you can attempt the first aid task untrained.</p><p>You can't take 20 on a Medicine check to administer first aid.</p>",
    "properties": ["Standard action", "Medicine"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "First Aid", action: "rollSkill", value: "med", target: "", content: "Roll Medicine Check", special: "" },
    ]
  }
}
RubiconActions.sleSkill = {
  /*==================================*/
  // sleight of hand
  /*==================================*/
  "hideObject": {
    "img": "icons/magic/perception/hand-eye-fire-blue.webp",
    "name": "Hide Object",
    "allowItem": 0, // no
    "actionType": "Standard",
    "shortDescription": "Hide a small object on your body",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As a standard action, you can use Sleight of Hand to hide a small object (including a small arm or a one-handed melee weapon with light bulk) on your body. The check is opposed by the Perception check of anyone observing you or searching your body. In the latter case, the searcher gains a +4 bonus to the check.</p><p>Very small objects or those created to be easy to hide can grant up to a +4 circumstance bonus to your Sleight of Hand check to hide an object on your person, as can compartments in clothing or armor made to facilitate such hiding.</p><p>Retrieving a weapon or object hidden on your person is a standard action.</p>",
    "properties": ["Standard action", "Sleight of Hand"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Hide Object", action: "rollSkill", value: "sle", target: "", content: "Roll Sleight of Hand Check", special: "" },
      { name: "Hide Object", action: "rollSkill", value: "per", target: "", content: "Roll Perception Check", special: "" },
    ]
  },
  "palmObject": {
    "img": "icons/equipment/hand/gauntlet-tooled-leather-grey.webp",
    "name": "Palm Object",
    "allowItem": 0, // no
    "actionType": "Standard",
    "shortDescription": "Palm a very small object",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As a standard action, you can use Sleight of Hand to palm a very small object no larger than a small communicator or memory stick. The check is opposed by the Perception checks of anyone nearby who could notice the attempt.</p><p>If you palm an object after having just successfully created a diversion with the Bluff skill, you gain a +10 bonus to this check.</p><p>If you fail the check, you still palm the object, but not without being noticed by those whose Perception check results exceed your Sleight of Hand result.</p><p>You can't take 20 on a Sleight of Hand check to palm an object.</p>",
    "properties": ["Standard action", "Sleight of Hand"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Palm Object", action: "rollSkill", value: "sle", target: "", content: "Roll Sleight of Hand Check", special: "" },
      { name: "Palm Object", action: "rollSkill", value: "per", target: "", content: "Roll Perception Check", special: "" },
    ]
  }
}
RubiconActions.steSkill = {
  /*==================================*/
  // stealth
  /*==================================*/
  "hide": {
    "img": "icons/magic/perception/shadow-stealth-eyes-purple.webp",
    "name": "Hide",
    "allowItem": 0, // no
    "actionType": "Part of a move",
    "shortDescription": "Hide from opponents while under cover or concealment",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>As part of a move, you can attempt to use Stealth to hide, opposed by Perception checks from creatures in the area that might detect you. A creature that fails the check treats you as if you had total concealment for as long as you remain in hiding. A creature that succeeds either sees or pinpoints you.</p><p>To hide, you must have one of the following at both the start and end of your move action:</p><ul><li>Cover or concealment (a successful Diversion from the Bluff skill counts as having started in cover or concealment)</li><li>Something that allows you to hide in plain sight, such as a cloaking field</li><li>Something that makes you invisible</li></ul><p>Hiding will be lost if you no longer meet any of those criteria (for example, the cover breaks). If this happens, but you end your turn meeting them again, you can make a fresh attempt to hide at that time without spending an action.</p><p>Hiding will also be lost if something gives away your position (such as you attack, or are attacked).</p><p>If you remain hidden from a creature until the moment immediately before you attack it, that creature is considered flat-footed for the purpose of that first attack against it. If you were hiding while invisible, and remain invisible after your first attack, that creature is also considered flat-footed against subsequent attacks until it succeeds at a Perception check to locate you, or until you become visible.</p><p><strong>Stealth bonuses and penalties</strong> (cumulative)</p><table class=\"rubicon-bonuses-table\"><tbody><tr><td>-10</td><td>You have moved more than half your speed this turn</td></tr><tr><td>-10</td><td>You started hiding with a diversion</td></tr><tr><td>+40</td><td>You are invisible or have total concealment, and you are Immobile (you haven't moved this turn)</td></tr><tr><td>+20</td><td>You are invisible or have total concealment, but you have moved this turn</td></tr><tr><td>-20</td><td>You are trying to hide again after sniping</td></tr></tbody></table>",
    "properties": ["Part of a move", "Stealth"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
      { name: "Hide", action: "rollSkill", value: "ste", target: "", content: "Roll Stealth Check", special: "" },
      { name: "Hide", action: "rollSkill", value: "per", target: "", content: "Roll Perception Check", special: "" },
    ]
  },
  "snipe": {
    "img": "icons/weapons/guns/rifle-brown.webp",
    "name": "Stealthy Snipe",
    "allowItem": 1, // required
    "actionType": "Standard",
    "shortDescription": "Pop out of hiding to make a ranged attack",
    "buttonComment": "Ranged weapon attack",
    "itemActionTypes": ["rwak"],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>If you have already successfully used Stealth to hide from a creature that is at least 10 feet away, you can briefly pop out of cover or concealment and make a single ranged attack against that creature. As long as you can reenter cover or concealment, you can attempt a Stealth check to hide again as part of that attack with a –20 penalty.</p>",
    "properties": ["Standard action", "Stealth", "Ranged"],
    "hasItemButtons": [
      { name: "Sniping", action: "rollAttack", value: "", target: "", content: "Attack", special: "" },
      { name: "Sniping", action: "rollDamage", value: "", target: "", content: "Damage", special: "" },
    ],
    "hasNoItemButtons": [
    ]
  }
}
RubiconActions.basic = {
  /*==================================*/
  // basic actions
  /*==================================*/
  "_basicAttack_": {
    "img": "icons/skills/melee/hand-grip-sword-strike-orange.webp",
    "name": "Basic Attack",
    "allowItem": 3, // required, display roll card
    "actionType": "",
    "shortDescription": "Perform a basic attack",
    "buttonComment": "",
    "itemActionTypes": ["mwak", "rwak"],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>Perform a basic attack</p>",
    "properties": ["_", "_"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "_reload_": {
    "img": "modules/rubicon-sfrpg/icons/quick-menu/reload.jpg",
    "name": "Reload",
    "allowItem": 5, // required, reload item
    "actionType": "",
    "shortDescription": "Reload a weapon",
    "buttonComment": "",
    "itemActionTypes": ["mwak", "rwak"],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>Reload a weapon</p>",
    "properties": ["_", "_"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "_equip_": {
    "img": "modules/rubicon-sfrpg/icons/quick-menu/equip.png",
    "name": "Equip",
    "allowItem": 6, // required, equip item
    "actionType": "",
    "shortDescription": "Equip an item",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>Equip an item</p>",
    "properties": ["_", "_"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "_unequip_": {
    "img": "modules/rubicon-sfrpg/icons/quick-menu/unequip.png",
    "name": "Unequip",
    "allowItem": 7, // required, unequip item
    "actionType": "",
    "shortDescription": "Unequip an item",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>Unequip an item.</p>",
    "properties": ["_", "_"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "_basicSpell_": {
    "img": "icons/magic/symbols/runes-star-pentagon-orange-purple.webp",
    "name": "Cast Spell",
    "allowItem": 4, // required, cast spell
    "actionType": "",
    "shortDescription": "Cast a spell",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>Cast a spell.</p>",
    "properties": ["_", "_"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "_identifySpell_": {
    "img": "modules/rubicon-sfrpg/icons/unknown_spell.webp",
    "name": "Identify Spell",
    "allowItem": 9, // required, identify spell
    "actionType": "",
    "shortDescription": "Identify or unidentify a spell",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>Toggle identification status of a spell.</p>",
    "properties": ["_", "_"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  },
  "_consumable_": {
    "img": "icons/consumables/potions/potion-vial-corked-purple.webp",
    "name": "Use Item",
    "allowItem": 8, // required, use consumable
    "actionType": "",
    "shortDescription": "Use a consumable item",
    "buttonComment": "",
    "itemActionTypes": [],
    "itemSpecialTarget": undefined,
    "requireTraining": false,
    "description": "<p>Use a consumable item.</p>",
    "properties": ["_", "_"],
    "hasItemButtons": [
    ],
    "hasNoItemButtons": [
    ]
  }
}
export default RubiconActions;