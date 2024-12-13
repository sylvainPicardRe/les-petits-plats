import { recipes } from "../data/recipes.js"
import { Recipe } from "./models/Recipe.js"
import { RecipeCard } from "./templates/RecipeCard.js"
import { RecipesCount } from "./templates/RecipesCount.js"
import { FiltersForm } from "./templates/FiltersForm.js"

class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this.$recipesFilters = document.querySelector('.recipes-filters')
        this.$recipesCount = document.querySelector('.recipes-count')
        this.$dropdownWrapper = document.querySelector('.dropdown-wrapper')

        this.$search = document.querySelector('.hero__search')
        this.$wrapper = document.querySelector( '.recipes-wrapper' )
        
        this._recipes = recipes
    }

    async main() {

        const Template = new RecipesCount(this._recipes)
        this.$recipesCount.appendChild(
            Template.createRecipesCount()
        )

        const Filter = new FiltersForm(this._recipes)
        Filter.render()

        this._recipes
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesWrapper.appendChild(
                Template.createRecipeCard()
            )
        })

            // TODO METTRE A JOUR LES LISTE
            // TODO SUPPRESSION DES TAGS
            // TODO AFFICHER LES TAGS SONT LES FILTRES


    }
}

const app = new App()
app.main()