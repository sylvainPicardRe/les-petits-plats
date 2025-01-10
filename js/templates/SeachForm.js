class SearchForm {
    constructor(Recipes, tagListSubject) {
        this.Recipes = Recipes

        this.tagListSubject = tagListSubject

        this.$wrapper = document.createElement('div')
        this.$wrapper.classList.add('search-form')
        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this.$filterFormWrapper = document.querySelector( '.filter-form-wrapper' )
        this.$recipeCountWrapper = document.querySelector('.recipes-count-wrapper')
    }

    search(query) {
        let SearchedRecipes = null

        this.Recipes.forEach(recipe => {
            if(recipe.name.toLowerCase().includes(query.toLowerCase())) {
                SearchedRecipes = this.Recipes.filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase()))
            } else if(recipe.ingredients.includes(query.toLowerCase())) {
                SearchedRecipes = this.Recipes.filter(recipe => recipe.ingredients.includes(query.toLowerCase()))
            } else if(recipe.ustensils.includes(query.toLowerCase())) {
                SearchedRecipes = this.Recipes.filter(recipe => recipe.ustensils.includes(query.toLowerCase()))
            } else if(recipe.appliance.includes(query.toLowerCase())) {
                SearchedRecipes = this.Recipes.filter(recipe => recipe.appliance.includes(query.toLowerCase))
            }
        })

        this.displayRecipes(SearchedRecipes)
    }

    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ''
    }

    displayRecipes(Recipes) {
        this.clearRecipesWrapper()

        this.clearFilterWrapper()

        this.clearRecipeCoutWrapper()

        const Template = new FilterForm(Recipes, this.tagListSubject)
        Template.render()

        const TemplateRecipeCount = new RecipesCount(Recipes)
        TemplateRecipeCount.render()

        if(Recipes !== null) {
        Recipes.forEach(Recipe => {
            const Template = new RecipeCard(Recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())     
        }) 
        } else {
            this.$recipesWrapper.innerHTML = `<p class="empty-recipes">Aucune recettes ne corresponds à la recherche</p>`
        }
    }

    onSearch() {
        this.$wrapper
            .querySelector('form')
            .addEventListener('keyup', e => {
                const query = e .target.value

                if(query.length >= 3) {
                    this.search(query)
                } else if(query.length === 0) {
                    this.displayRecipes(this.Recipes)
                }
            })
    }

    clearFilterWrapper() {
        this.$filterFormWrapper.innerHTML = ''
    }

    clearRecipeCoutWrapper() {
        this.$recipeCountWrapper.innerHTML = ''
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