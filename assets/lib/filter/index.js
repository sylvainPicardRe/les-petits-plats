export class Filter {
    /**
     * 
     * @param {string} appliance
     * @param {array} Recipes
     * @returns
     */

    static async filterByAppliance(appliance, Recipes) {
        await new Promise(resolve => setTimeout(resolve, 200))

        if(!appliance) {
            return Recipes
        }
        
        return Recipes.filter(Recipe => Recipe.appliance === appliance)
    }
}