class FilterForm {
    constructor(Recipes, tagListSubject) {
        this.Recipes = Recipes;
        this.tagListSubject = tagListSubject

        this.$wrapper = document.createElement( 'div' );
        this.$wrapper.classList.add( 'filter-wrapper' );
        this.$wrapper.classList.add( 'py-5' );

        this.$filterFormWrapper = document.querySelector( '.filter-form-wrapper' )
        this.$recipesWrapper = document.querySelector( '.recipes-wrapper' )
        this.$tagsWrapper = document.querySelector( '.tags-wrapper' )
        this.$recipeCountWrapper = document.querySelector('.recipes-count-wrapper')
    }

    createDropdown(title, dropdownId, type) {
        const items = this.getUniqueItems(type)
        return `
            <div class="dropdown col">
                <button class="dropbtn form-select form-select-lg py-4">${title}</button>
                <div id="${dropdownId}" class="dropdown-content form-select form-select-lg mb-3 ${type === 'ustensils' || type === 'appliance' ? type : `${type}s`} p-0">
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

    async filterRecipes(query, list){
        this.clearRecipesWrapper()
        
        const AdaptedFilterLib = new FilterRecipesAdapter(this.Recipes, query, list)
        const FilterdRecipes = await AdaptedFilterLib.filterByCriterion()
        
        FilterdRecipes.forEach(Recipe => {
            const Template = new RecipeCard(Recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())
        })
        
        this.clearFilterWrapper()

        this.clearRecipeCoutWrapper()

        const Template = new FilterForm(FilterdRecipes, this.tagListSubject)
        Template.render()

        const TemplateRecipeCount = new RecipesCount(FilterdRecipes)
        TemplateRecipeCount.render()
        
    }

    onChangeFilter() {
        const that = this

        this.$wrapper
            .querySelectorAll('.dropdown')
            .forEach(dropdown => {
                dropdown.lastElementChild.childNodes[3].querySelectorAll('.dropdown-item').forEach(item => {
                    item.addEventListener('click', e => {

                        const query = e.target.text
                        const list = dropdown.lastElementChild.classList[4]
                        this.filterRecipes(query, list)
                        if(!that.tagListSubject._observer[0]._list.includes(query)){
                            that.tagListSubject.fire('add', query)
                        }

                        this.clearTagsWrapper()

                        const Template = new Tag(this.tagListSubject, this.Recipes)
                        Template.render()
                    })
                })
            }) 
        
    }

    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ""
    }

    clearRecipeCoutWrapper() {
        this.$recipeCountWrapper.innerHTML = ""
    }

    clearFilterWrapper() {
        this.$filterFormWrapper.innerHTML = ""
    }


    clearTagsWrapper() {
        this.$tagsWrapper.innerHTML = ""
    }

    toggleShow() {
        const dropBtns = this.$wrapper.querySelectorAll( '.dropbtn' );
        dropBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                const dropdownContent = e.target.nextElementSibling;
                dropdownContent.classList.toggle('show');
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
        
        this.$filterFormWrapper.appendChild(this.$wrapper)

        this.onChangeFilter()
        this.toggleShow()

    }
}