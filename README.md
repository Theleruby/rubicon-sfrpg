# Rubicon for Starfinder

Rubicon is an extension module for Foundry VTT which is designed to improve the Starfinder roleplaying experience. It was initially developed over a number of 'combat test' sessions that I performed with my brother prior to us starting our Starfinder roleplaying adventure. Since then I have continued to expand it with new features as needed by my roleplaying group.

## Features

### Heads-Up Display

Rubicon adds a new HUD which shows information about the selected token. The new HUD is wrapped around the macro bar on the bottom of the screen (the macro bar is moved slightly to the right to accomodate this).

There are currently two versions of this HUD.

#### Character/NPC HUD

When a character or NPC is selected, the heads-up display shows information about:
 * EAC and KAC
 * Primary movement speed
 * Hit points, stamina and resolve
 * Equipped weapons
 * Free spell slots
 * Any status conditions they might have

Here's a screenshot of what the HUD looks like:

![Screenshot](https://stuff.theleruby.com/media/rubicon-character-hud.png)

#### Starship HUD (experimental)

When a starship is selected, the heads-up display shows information about:
 * The AC, TL, shield level and ablative armour level for each quadrant
 * Hit points and total shields
 * Damage threshold and critical threshold
 * Move speed and turn distance
 * Sensor range
 * Sensor DC (5 + 1.5*tier) - used by sensor related ship actions
 * Action DC (10 + 1.5*tier) - used by most of the standard ship actions
 * Difficult DC (15 + 1.5*tier) - used by some of the harder ship actions
 * Status of each starship system

If you have a starship selected with actor-based crew, it also shows an extra sidebar with the following information for each crew member:
 * Name of crew member
 * Assigned crew role
 * Hit points and resolve

Future plans are to also add:
 * The number of used and remaining ICM nodes for the round
 * Pending damage for each quadrant
 * Highlighting which crew members have performed an action this round
 * Ammo count of limited-fire weapons

Here's a screenshot of what the HUD looks like:

![Screenshot](https://stuff.theleruby.com/media/rubicon-starship-hud.png)

### Quick Action Menus

Rubicon adds some quick action menus which allow you to easily perform common actions using the selected token without having to open the character sheet. Examples of things supported are: attacking, equipping/unequipping, reloading, casting spells, using consumables, and rolling skills. The quick menus also allow you to perform many common turn actions not supported out of the box (such as Harrying Fire) by inserting custom roll cards into the chat log.

During starship combat, a different set of quick action menus is displayed which allow you to perform crew actions for the selected starship. It also filters the available actions depending on the combat phase and the roles currently assigned to the crew.

This frees up most uses of the macro bar, which is instead intended to be used for player-specific toggles (e.g. toggling feats on and off), or used by the GM for tasks that only need to be performed by the GM.

### Other Features

There are a few other small/minor features:

* Basic functions which can be used by the GM
* Small tweaks to Foundry's user interface styling
* Bug fixes and workarounds which are hacky and not really suitable to go into the sfrpg core

## Requirements
To use this module you will require:
- Foundry VTT version 12
- The Starfinder system fork located at https://github.com/Theleruby/foundryvtt-sfrpg (this module depends on some code changes present in the fork)

## License
Game content from Starfinder (e.g. the rules text used in the action files) is licensed under OGL. Everything else is licensed under the MIT license.

## Support
Use the roleplaying channel in my Discord server.
