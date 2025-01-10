class SearchForm {
    constructor(Recipes) {
        this.isSearchingByIngredient = false
        this.isSearchingByUstensil = false
        this.isSearchingByAppliance = false

        // this.RecipeNameSearch = new RecipeNameSearch(Recipes)
        // this.IngredientSearch = new IngredientSearch(Recipes)
        // this.UstensilSearch = new UstensilSearch(Recipes)
        // this.ApplianceSearch = new ApplianceSearch(Recipes)

        this.$wrapper = document.createElement('div')
        this.$wrapper.classList.add('search-form')
        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
    }

    search(query) {
        // let SearchedRecipes = null

        // if(this.isSearchingByAppliance) {
        //     SearchedRecipes = this.ApplianceSearch.search(query)
        // } else if(this.isSearchingByUstensil) {
        //     SearchedRecipes = this.UstensilSearch.search(query)
        // } else if(this.isSearchingByIngredient) {
        //     SearchedRecipes = this.IngredientSearch.search(query)
        // } else {
        //     SearchedRecipes = this.RecipeNameSearch.search(query)
        // }

        // this.displayRecipes(SearchedRecipes)
    }

    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ''
    }

    displayRecipes(Recipes) {
        this.clearRecipesWrapper()

        Recipes.forEach(Recipe => {
            const Template = new RecipeCard(Recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())     
        })
    }

    onSearch() {
        this.$wrapper
            .querySelector('form')
            .addEventListener('keyup', e => {
                const query = e .target.value

                if(query.length >= 3) {
                    this.search(query)
                } else if(query.length === 0) {
                    this.displayRecipes(Recipes)
                }
            })
    }

    render() {
        const searchForm = `
             <form action="#" method="POST" class="col-8 rounded-3 hero__search m-5">
                    <input type="search" name="search" id="search" placeholder="Rechercher une recette, un ingrédient, ...">
                    <button class="rounded-3 p-2 search__button"><i class="fas fa-search"></i></button>
                </form>
        `

        this.$wrapper.innerHTML = searchForm

        this.onSearch()

        this.$searchFormWrapper.appendChild(this.$wrapper)
    }
}