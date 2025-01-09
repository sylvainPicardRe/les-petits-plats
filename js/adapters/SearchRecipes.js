class SearchRecipesAdapter {
    constructor(Recipes, search) {
        this.Recipes = Recipes
        this.search = search 
    }

    async searchByInput() {
        const search = new SearchV1(this.Recipes, this.search)
        return search.searchByInput()
    }
}