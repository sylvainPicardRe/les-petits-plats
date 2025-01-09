class SearchV1 {
    /**
     * 
     * @param {array} Recipes
     * @param {string} search
     */

    constructor(Recipes, search){
        this._Recipes = Recipes
        this._search = search
    }

    async searchByInput() {
        
        if(!this._search) {
            return this._Recipes
        }

        const FilteredRecipes = []

        for(let i = 0; i < this._Recipes.length; i++) {
            if(this._Recipes[i].appliance.toLowerCase().includes(this._search.toLowerCase())){
                FilteredRecipes.push(this._Recipes[i])
            } else if(this._Recipes[i].name.toLowerCase().includes(this._search.toLowerCase())) {
                FilteredRecipes.push(this._Recipes[i])
            }
            else {
                for(let j = 0; j < this._Recipes[i].ustensils.length; j++){
                    if(this._Recipes[i].ustensils[j].toLowerCase().includes(this._search.toLowerCase())){
                        FilteredRecipes.push(this._Recipes[i])
                        
                    }
                }   
                
                for(let j = 0; j < this._Recipes[i].ingredients.length; j++) {
                    if(this._Recipes[i].ingredients[j].ingredient.toLowerCase().includes(this._search.toLowerCase())){
                        FilteredRecipes.push(this._Recipes[i])
                    }
                }
            }
        }
        
        return FilteredRecipes
    }
}