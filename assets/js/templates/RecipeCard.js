export class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe
    }

    createRecipeCard() {
        const $wrapper = document.createElement( 'div' )
        $wrapper.classList.add('recipe-card-wrapper')
        $wrapper.classList.add('col-4')
        $wrapper.classList.add('mb-5')

        const ingredientsList = this._recipe.ingredients
        .map(item => `
            <div class="col-6 mb-3">
                <p class="m-0">${item.ingredient}</p>
                <p class="m-0">${item.quantity ? item.quantity : '-'} ${item.unit ? item.unit : ''}</p>
            </div>
            `).join('')

        const recipeCard = `
            <div class="card">
                <img src="${this._recipe.imgSrc}" class="card-img-top" alt="${this._recipe.name}">
                <div class="card-body container-fluid pb-5">
                    <h5 class="card-title my-3">${this._recipe.name}</h5>
                    <h6>RECETTE</h6>
                    <p class="card-text card__description">${this._recipe.description}</p>
                    <h6>INGRÉDIENTS</h6>
                    <div class="row">
                        ${ingredientsList}
                    </div>
                </div>
            </div>
        `

        $wrapper.innerHTML = recipeCard
        return $wrapper

    } 
}