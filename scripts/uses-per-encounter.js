 import { libWrapper } from "../lib/shim.js";

const moduleName = "uses-per-encounter";


Hooks.once("init", () => {
    // Open module API
    window.UsesPerEncounter = UsesPerEncounter;
});

Hooks.once("setup", () => {
    // Add new values to CONFIG.DND5E
    window.UsesPerEncounter.addConfigStrings();
})

Hooks.once("ready", () => {
    // Register hooks
    window.UsesPerEncounter.registerReadyHooks();
});


class UsesPerEncounter {
    static addConfigStrings() {
        // Add "Encounter" to options for Limited Uses
        CONFIG.DND5E.limitedUsePeriods.encounter = game.i18n.localize("uses-per-encounter.Encounter");
    }

    static registerReadyHooks() {
        // When a combatant is deleted (removed from combat), replenish uses for items set to "per Encounter"
        Hooks.on("deleteCombatant", async combatant => await window.UsesPerEncounter.refreshEncounterUses(combatant));

        // When a combat is deleted, perform the above for all combatants
        Hooks.on("deleteCombat", async combat => {
            const combatants = combat.turns;
            for (const combatant of combatants) {
                await window.UsesPerEncounter.refreshEncounterUses(combatant);
            }
        });
    }

    // Replenish uses for items set to "per Encounter"
    static async refreshEncounterUses(combatant) {
        const actor = combatant.actor;
        const items = actor.items;
        const updates = [];
        for (const item of items.filter(i => i.data.data.uses.per === "encounter")) {
            updates.push({
                _id: item.id,
                "data.uses.value": item.data.data.uses.max
            });
        }

        await actor.updateEmbeddedDocuments("Item", updates);
    }
}
