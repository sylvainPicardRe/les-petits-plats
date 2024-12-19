import { recipes } from "../data/recipes.js"
import { Recipe } from "./models/Recipe.js"
import { RecipeCard } from "./templates/RecipeCard.js"
import { RecipesCount } from "./templates/RecipesCount.js"
import { FiltersForm } from "./templates/FiltersForm.js"

import { Tag } from "./templates/Tag.js"


class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this.$recipesFilters = document.querySelector('.recipes-filters')
        this.$recipesCount = document.querySelector('.recipes-count')
        this.$dropdownWrapper = document.querySelector('.dropdown-wrapper')
        this.$tagsWrapper = document.querySelector('.tags-wrapper')

        this.$tagsElements = []

        this.$search = document.querySelector('.hero__search')
        this.$wrapper = document.querySelector( '.recipes-wrapper' )
        
        this._recipes = recipes
    }

    async main() {

        const Template = new RecipesCount(this._recipes)
        this.$recipesCount.appendChild(
            Template.createRecipesCount()
        )

        const Filter = new FiltersForm(this._recipes)
        Filter.render()

        this._recipes
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesWrapper.appendChild(
                Template.createRecipeCard()
            )
        })

        const dropdownItems = document.querySelectorAll('.dropdown-item')

        dropdownItems.forEach(item => {
            item.childNodes[1].addEventListener('click', e => {
                const tag = e.target.text
                const Template = new Tag(tag)
                const wrapper = Template.createTag()
                this.$tagsWrapper.appendChild(wrapper)
                console.log('Template', wrapper.childNodes[1])
                wrapper.childNodes[1].addEventListener('click', e => {
                    console.log('click', e.target.closest('div'))
                    e.target.closest('div').remove()
                })
                // this.$tagsElements.push(Template.createTag())
            })
        })
        

            // TODO METTRE A JOUR LES LISTE
            // TODO SUPPRESSION DES TAGS
            // TODO AFFICHER LES TAGS SONT LES FILTRES


    }
}

const app = new App()
app.main()