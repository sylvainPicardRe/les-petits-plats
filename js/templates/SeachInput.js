class SearchInput {
    constructor(Recipes, tagListSubject) {
        this.Recipes = Recipes
        this.tagListSubject = tagListSubject

        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this.$recipesCountWrapper = document.querySelector('.recipes-count-wrapper')
    }

    createSearchInput() {

        const $wrapper = document.createElement('form')
        $wrapper.classList.add('col-8')
        $wrapper.classList.add('rounded-3')
        $wrapper.classList.add('hero__search')
        $wrapper.classList.add('m-5')

        const searchInput = `
            <input type="search" name="search" id="search" placeholder="Rechercher une recette, un ingrédient, ...">
            <button class="rounded-3 p-2 search__button"><i class="fas fa-search"></i></button>
        `

        $wrapper.innerHTML = searchInput
        return $wrapper
    }

    search() {
        const searchInput = document.getElementById("search")
        
        searchInput.addEventListener('input', async e => {
            if(e.target.value.length >= 3) {
                this.$recipesWrapper.innerHTML = ""
            
                const AdapterSearchLib = new SearchRecipesAdapter(this.Recipes, e.target.value)
                const FilteredRecipes = await AdapterSearchLib.searchByInput()

                if(FilteredRecipes.length > 0) {
                    FilteredRecipes.forEach(recipe => {
                        const recipeObject = new Recipe(recipe)
                        const Template = new RecipeCard(recipeObject)
                        this.$recipesWrapper.appendChild(Template.createRecipeCard())         
                    })
                } else {
                    this.$recipesWrapper.innerHTML = `<p class="empty-recipes">Aucune recettes ne corresponds à la recherche</p>`
                }

                const TemplateRecipesCount = new RecipesCount(FilteredRecipes)
                this.$recipesCountWrapper.innerHTML = ``
                this.$recipesCountWrapper.appendChild(
                    TemplateRecipesCount.render()
                )
                
                const Template = new FilterForm(FilteredRecipes, this.tagListSubject)
                Template.clearFilterWrapper()
                Template.render()

            }
        })
    }

    render() {
        this.$searchFormWrapper.appendChild(this.createSearchInput()) 
        this.search()  
    }
}