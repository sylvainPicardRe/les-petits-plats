class Tag {
    constructor(tagListSubject, Recipes) {
        this.tagListSubject = tagListSubject
        this.Recipes = Recipes

        this.$tagsWrapper = document.querySelector( '.tags-wrapper' )
        this.$filterFormWrapper = document.querySelector( '.filter-form-wrapper' )
        this.$recipesWrapper = document.querySelector( '.recipes-wrapper' )
        this.$recipesCountWrapper = document.querySelector('.recipes-count-wrapper')
    }
    
    clearTagsWrapper() {
        this.$tagsWrapper.innerHTML = ""
    }

    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ""
    }

    clearFilterFormWrapper() {
        this.$filterFormWrapper.innerHTML = ""
    }

    onChangeTag() {
        this.$tagsWrapper.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', e => {
                const tagName = e.target.parentElement.firstElementChild.innerText
                this.tagListSubject.fire('remove', tagName)
                this.clearTagsWrapper()
                this.filteredRecipes()
                this.render()
            })
        })
    }

    filteredRecipes() {
        const tags = this.tagListSubject._observer[0]._list

        this.clearRecipesWrapper()
        this.clearFilterFormWrapper()

        this.Recipes.forEach(Recipe => {
            const Template = new RecipeCard(Recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())
        })

        const Template = new FilterForm(this.Recipes, this.tagListSubject)
        Template.render()

        const TemplateRecipesCount = new RecipesCount(this.Recipes)
            this.$recipesCountWrapper.innerHTML = ``
            TemplateRecipesCount.render()
    }

    createTag(tagName) {
        const $wrapper = document.createElement( 'div' )
        $wrapper.classList.add('tag')
        $wrapper.classList.add('px-3')
        $wrapper.classList.add('py-4')

        const tag = `
            <a href="#${tagName}">
                <p>${tagName}</p>
                <i class="fa-solid fa-xmark"></i>
            </a>
        `
        
        $wrapper.innerHTML = tag
        return $wrapper
    }

    render() {
        this.tagListSubject._observer[0]._list.forEach(tagName => {
            this.$tagsWrapper.appendChild(this.createTag(tagName))
        })

        this.onChangeTag() 
    }
}