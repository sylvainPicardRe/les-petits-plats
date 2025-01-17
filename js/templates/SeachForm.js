class SearchForm {
    constructor(Recipes) {
        this.Recipes = Recipes

        this.$wrapper = document.createElement('div')
        this.$wrapper.classList.add('search-form')
        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
    }

    search(query) {
        let SearchedRecipes = []

        for(let i = 0; i < this.Recipes.length; i++) {
            if(this.Recipes[i].appliance.toLowerCase().includes(query.toLowerCase())){
                SearchedRecipes.push(this.Recipes[i])
            } else if(this.Recipes[i].name.toLowerCase().includes(query.toLowerCase())) {
                SearchedRecipes.push(this.Recipes[i])
            }
            else {
                for(let j = 0; j < this.Recipes[i].ustensils.length; j++){
                    if(this.Recipes[i].ustensils[j].toLowerCase().includes(query.toLowerCase())){
                        SearchedRecipes.push(this.Recipes[i])
                        
                    }
                }   
                
                for(let j = 0; j < this.Recipes[i].ingredients.length; j++) {
                    if(this.Recipes[i].ingredients[j].ingredient.toLowerCase().includes(query.toLowerCase())){
                        SearchedRecipes.push(this.Recipes[i])
                    }
                }
            }
        }

        console.log(SearchedRecipes)
        
        

        this.displayRecipes(SearchedRecipes)
    }

    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ''
    }

    displayRecipes(Recipes) {
        this.clearRecipesWrapper()

        if(Recipes.length > 0) {
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
        this.$wrapper.querySelector('form')
        .addEventListener('submit', e => {
            e.preventDefault()
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