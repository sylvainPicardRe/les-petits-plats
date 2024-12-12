import { Filter } from "../lib/filter/index.js"

export class FilterRecipesAdapter {
    constructor(Recipes, appliance) {
        this.Recipes = Recipes
        this.appliance = appliance
    }

    async filterByAppliance() {
        return await Filter.filterByAppliance(this.appliance, this.Recipes)
    }
}