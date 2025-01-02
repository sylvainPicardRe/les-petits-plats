class FilterRecipesAdapter {
    constructor(Recipes, query, list) {
        this.Recipes = Recipes
        this.query = query
        this.list = list
    }

    async filterByCriterion() {
        return await Filter.filterByCriterion(this.query, this.list, this.Recipes)
    }
}