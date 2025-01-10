class RecipesCount {
    constructor(recipes) {
        this._recipes = recipes

        this.$recipesCountWrapper = document.querySelector('.recipes-count-wrapper')
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

    render() {
        this.$recipesCountWrapper.appendChild(
            this.createRecipesCount()
        )
    }
}