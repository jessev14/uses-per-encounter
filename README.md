![All Downloads](https://img.shields.io/github/downloads/jessev14/uses-per-encounter/total?style=for-the-badge)

![Latest Release Download Count](https://img.shields.io/github/downloads/jessev14/uses-per-encounter/latest/UPE.zip)
[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fuses-per-encounter&colorB=4aa94a)](https://forge-vtt.com/bazaar#package=uses-per-encounter)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/jessev14)

# Uses Per Encounter

Items can be set to have Limited Uses per Encounter.

These uses function the same as other Limited Use periods, but are automatically replenished when the actor leaves combat.

<img src="/img/uses-per-encounter.png" height="350"/>


### Technical Notes
A new `encounter` key is added to `CONFIG.DND5E.limitedUsePeriods`. Item sheets use this object to generate the select options for Limited Uses.

When a combatant is removed from combat (combatant or combat is deleted), the module filters the corresponding actor's items for items with `item.data.data.uses.per === "encounter"`. These items are then updated to replenish the use value to the set max.
