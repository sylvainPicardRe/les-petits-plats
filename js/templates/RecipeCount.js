class RecipesCount {
    constructor(recipes) {
        this._recipes = recipes

        this.$recipeCountWrapper = document.querySelector('.recipes-count-wrapper')
    }

    render() {
        const $wrapper = document.createElement( 'div' )
        $wrapper.classList.add('recipes-count')

        const recipesCount = `
            <p>${this._recipes.length} ${this._recipes.length > 1 ? 'Recettes' : 'Recette'}</p>
        `

        $wrapper.innerHTML = recipesCount
        
        this.$recipeCountWrapper.appendChild($wrapper)
    } 

}