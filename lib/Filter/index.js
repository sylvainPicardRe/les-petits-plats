class Filter {
    /**
     * 
     * @param {string} query
     * @param {array} Recipes
     * @param {array} list
     * @returns
     */

    static async filterByCriterion(query, list, Recipes) {
        await new Promise(resolve => setTimeout(resolve, 200))

        if(!query){
            return Recipes
        }


        if(list === "appliance"){
            return Recipes.filter(Recipe => Recipe.appliance === query)
        } else if (list === "ingredients") {
            return Recipes.filter(Recipe => Recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === query.toLowerCase()))
        } else if (list === "ustensils") {
            return Recipes.filter(Recipe => Recipe.ustensils.some(ustensil => ustensil.toLowerCase() === query.toLowerCase()))
        } else {
            return Recipes
        }
    }
}