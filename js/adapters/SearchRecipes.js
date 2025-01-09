class SearchRecipesAdapter {
    constructor(Recipes, search) {
        this.Recipes = Recipes
        this.search = search 
    }

    async searchByInput() {
        return await SearchV2.searchByInput(this.Recipes, this.search)  
    }
}