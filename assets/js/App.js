import { recipes } from "../data/recipes.js"
import { Recipe } from "./models/Recipe.js"
import { RecipeCard } from "./templates/RecipeCard.js"

class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this._recipes = recipes
    }

    async main() {
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