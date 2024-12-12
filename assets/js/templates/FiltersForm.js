import { Recipe } from "../models/Recipe.js"
import { FilterRecipesAdapter } from "../../adapters/FilterRecipesAdapter.js"
import { RecipeCard } from "./RecipeCard.js"

export class FiltersForm {
    constructor(Recipes) {
        this.Recipes = Recipes

        this.$wrapper = document.createElement( 'div' )
        this.$wrapper.classList.add( 'd-flex' )
        this.$wrapper.classList.add( 'gap-5' )
        this.$filtersFormWrapper = document.querySelector( '.filters-form-wrapper' )
        this.$recipesWrapper = document.querySelector( '.recipes-wrapper' )

    }

    async filterRecipes(filtre) {
        this.clearRecipesWrapper()
       
        const AdaptedFilterLib = new FilterRecipesAdapter(this._Recipes, filtre)
        const FilteredRecipes = await AdaptedFilterLib.filterByAppliance()

        FilteredRecipes.forEach(recipe => {
            const recipeObject = new Recipe(recipe)
            const Template = new RecipeCard(recipeObject)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())         
        });
        
        
    }

    onChangeFilter() {
        this.clearFilterFormsWrapper()
        this.$wrapper
            .querySelectorAll('.dropdown')
            .forEach(dropdow => {
                dropdow
                .querySelector('div')
                .addEventListener('click', e => {
                    if(e.target.tagName === 'A') {
                        const resultat = e.target.text
                        this.filterRecipes(resultat)
                    }
                }) 
            })
    }
    
    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ""
    }

    clearFilterFormsWrapper() {
        this.$filtersFormWrapper.innerHTML = ""
    }

    createDropdown(title, dropdownId, type) {
        const items = this.getUniqueItems(type)
        return `
            <div class="dropdown col">
                <button class="dropbtn form-select form-select-lg py-4">${title}</button>
                <div id="${dropdownId}" class="dropdown-content form-select form-select-lg mb-3 ${type}s p-0">
                    <form class="filter__search m-4">
                        <input type="search" id="search-${type}" onkeyup="filter('search-${type}', '${dropdownId}')">
                        <button class="search__button px-2"><i class="fas fa-search"></i></button>
                    </form>                       
                    <div class="filter-items mx-4">
                    ${items.map(item => 
                        `<a class="py-2 px-0" href="#${item}">${item.charAt(0).toUpperCase() + item.slice(1)}</a>`
                    ).join('')}
                    </div>
                </div>
            </div>
        `
    }

    getUniqueItems(type) {
        const itemSet = new Set();
        this.Recipes.forEach(recipe => {
            if (type === 'ingredient') {
                recipe.ingredients.forEach(item => {
                    itemSet.add(item.ingredient.toLowerCase());
                });
            } else if (type === 'appliance') {
                itemSet.add(recipe.appliance.toLowerCase());
            } else if (type === 'ustensils') {
                recipe.ustensils.forEach(ustensil => {
                    itemSet.add(ustensil.toLowerCase());
                });
            }
        });
        return Array.from(itemSet);
    }

    toggleShow() {
        const dropbtns = document.querySelectorAll('.dropbtn')
        dropbtns.forEach(dropbtn => {
            dropbtn.onclick = (e => {
                e.target.parentElement.children[1].classList.toggle("show")
            })
        })
    }

    render() {

        const filtersForm = `
            ${this.createDropdown('Ingrédients', 'dropdownIngredients', 'ingredient')}
            ${this.createDropdown('Appareils', 'dropdownAppliance', 'appliance')}
            ${this.createDropdown('Ustensiles', 'dropdownUstensils', 'ustensils')}
        `

        this.$wrapper.innerHTML = filtersForm
        
        this.onChangeFilter()

        this.$filtersFormWrapper.appendChild(this.$wrapper)

        this.toggleShow()
    }

}