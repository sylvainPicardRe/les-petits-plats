export class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe;
        
        this.$wrapper = document.createElement( 'div' );
        this.$wrapper.classList.add( 'recipe-card-wrapper' );
        // this.$wrapper.classList.add( 'col-4' );
        // this.$wrapper.classList.add( 'mb-5' );
    }

    get recipe() {
        return this._recipe
    }

    createRecipeCard() {
        const $wrapper = document.createElement( 'div' )
        $wrapper.classList.add('recipe-card-wrapper')
        // $wrapper.classList.add('col-4')
        // $wrapper.classList.add('mb-5')

        const ingredientsList = this._recipe.ingredients
        .map(item => `
            <div>
                <p class="m-0">${item.ingredient}</p>
                <p class="quantity">${item.quantity ? item.quantity : '-'} ${item.unit ? item.unit : ''}</p>
            </div>
            `).join('')

        const recipeCard = `
            <div class="card">
                <p class="card__time">${this._recipe.time} min</p>
                <img src="${this._recipe.imgSrc}" class="card-img-top" alt="${this._recipe.name}">
                <div class="card-body container-fluid pb-5">
                    <h5 class="card-title ">${this._recipe.name}</h5>
                    <h6>RECETTE</h6>
                    <p class="card-text card__description">${this._recipe.description}</p>
                    <h6>INGRÉDIENTS</h6>
                    <div class="card__ingredients-list">
                        ${ingredientsList}
                    </div>
                </div>
            </div>
        `

        $wrapper.innerHTML = recipeCard
        return $wrapper
    }
}