export class RecipesCount {
    constructor(recipes) {
        this._recipes = recipes
    }

    createRecipesCount() {
        const $wrapper = document.createElement( 'div' )
        $wrapper.classList.add('recipes-count')

        const recipesCount = `
            <p>${this._recipes.length} ${this._recipes.length > 1 ? 'Recettes' : 'Recette'}</p>
        `

        $wrapper.innerHTML = recipesCount
        return $wrapper

    } 
}