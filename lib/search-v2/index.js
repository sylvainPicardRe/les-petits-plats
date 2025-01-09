class SearchV2{
    /**
     * 
     * @param {array} Recipes
     * @param {string} search
     */

    static async searchByInput(Recipes, search) {
        await new Promise(resolve => setTimeout(resolve, 200))

        if(!search) {
            return this._Recipes
        }

        let FilteredRecipes = []
        const itemSet = new Set()

        Recipes.forEach(recipe => {
            if(recipe.appliance.toLowerCase().includes(search.toLowerCase())){
                itemSet.add(recipe)
            } else if(recipe.name.toLowerCase().includes(search.toLowerCase())) {
                itemSet.add(recipe)
            }
            else {
                recipe.ustensils.forEach(ustensil => {
                    if(ustensil.toLowerCase().includes(search.toLowerCase())){
                        itemSet.add(recipe)
                    }
                })   
                
                recipe.ingredients.forEach(ingredient => {
                    if(ingredient.ingredient.toLowerCase().includes(search.toLowerCase())){
                        itemSet.add(recipe)
                    }
                })
            }

            FilteredRecipes = Array.from(itemSet)
        })

        return FilteredRecipes
    }
}