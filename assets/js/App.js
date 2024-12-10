import { recipes } from "../data/recipes.js"
import { Recipe } from "./models/Recipe.js"
import { RecipeCard } from "./templates/RecipeCard.js"
import { RecipesCount } from "./templates/RecipesCount.js"

class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this.$recipesFilters = document.querySelector('.recipes-filters')
        this.$recipesCount = document.querySelector('.recipes-count')
        
        this._recipes = recipes
    }

    async main() {

        const Template = new RecipesCount(this._recipes)
        this.$recipesCount.appendChild(
            Template.createRecipesCount()
        )

        this._recipes
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesWrapper.appendChild(
                Template.createRecipeCard()
            )
        })


    }
}

const app = new App()
app.main()