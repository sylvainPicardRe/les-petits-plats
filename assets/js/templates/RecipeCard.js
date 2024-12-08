class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe
    }

    createRecipeCard() {
        const $wrapper = document.createElement( 'div' )
        $wrapper.classList.add('recipe-card-wrapper')

        const recipeCard = `
            <div class="card">
                <img src="${this.recipe.imgSrc}"
            </div>
        `

        $wrapper.innerHTML = recipeCard
        return $wrapper

    } 
}