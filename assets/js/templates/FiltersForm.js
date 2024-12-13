import { Recipe } from "../models/Recipe.js"
import { FilterRecipesAdapter } from "../../adapters/FilterRecipesAdapter.js"
import { RecipeCard } from "./RecipeCard.js"
import { Tag } from "./Tag.js"

export class FiltersForm {
    constructor(Recipes) {
        this.Recipes = Recipes

        this.$wrapper = document.createElement( 'div' )
        this.$wrapper.classList.add( 'd-flex' )
        this.$wrapper.classList.add( 'gap-5' )
        this.$filtersFormWrapper = document.querySelector( '.dropdown-wrapper' )
        this.$recipesWrapper = document.querySelector( '.recipes-wrapper' )

    }

    async filterRecipes(filtre) {
        this.clearRecipesWrapper()
       
        const AdaptedFilterLib = new FilterRecipesAdapter(this.Recipes, filtre)
        const FilteredRecipes = await AdaptedFilterLib.filterByAppliance()

        FilteredRecipes.forEach(recipe => {
            const recipeObject = new Recipe(recipe)
            const Template = new RecipeCard(recipeObject)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())         
        });
        
        
    }

    tag() {
        const dropdowItems = document.querySelectorAll('.dropdown-item')
        const tagWrapper = document.querySelector('.tags-wrapper')
        const tags = tagWrapper.childNodes
        
        dropdowItems.forEach(item => {
            item.addEventListener('click', e => {
                const tag = e.target.text
                // this.addTag(tag)
            })
            tags.forEach(tag => {
                console.log(tag)
            })
        })
        

        console.log(tags)

        tags.forEach(tag => {
            console.log(tag)
        })
        
        tagWrapper.childNodes.forEach(tag => {
            console.log(tag)
        })
        
        // tagWrapper.childNodes.foraddEventListener('click', e => {
        //     const tag = e.target
        //     this.removeTag(tag)
        // })


    }

    addTag(tag) {
        const tagWrapper = document.querySelector('.tags-wrapper')
        const Template = new Tag(tag)
        tagWrapper.appendChild( Template.createTag())
    }

    removeTag(tag) {
        const tagWrapper = document.querySelector('.tags-wrapper')
        // tagWrapper.removeChild(tag)
        console.log(tag)
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
                    <ul class="dropdown-list">
                    ${items.map(item => 
                        `
                        <li class="dropdown-item">
                            <a class="py-2 px-4" href="#${item}">${item.charAt(0).toUpperCase() + item.slice(1)}</a>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </li>
                        `
                    ).join('')}
                    </ul>
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

    trierFiltres() {
        document.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', e => {
                const itemLi = e.target.parentElement
                const itemI = itemLi.children[1]
                // const itemLink = e.target

                itemLi.classList.toggle('highlight')
                itemI.classList.toggle('show')
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

        this.trierFiltres()

        this.tag()

    }

}