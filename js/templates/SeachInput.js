class SearchInput {
    constructor(Recipes) {
        this.Recipes = Recipes
        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
    }

    createSearchInput() {

        const $wrapper = document.createElement('form')
        $wrapper.classList.add('col-8')
        $wrapper.classList.add('rounded-3')
        $wrapper.classList.add('hero__search')
        $wrapper.classList.add('m-5')

        const searchInput = `
            <input type="search" name="search" id="search" placeholder="Rechercher une recette, un ingrédient, ...">
            <button class="rounded-3 p-2 search__button"><i class="fas fa-search"></i></button>
        `

        $wrapper.innerHTML = searchInput
        return $wrapper
    }

    render() {
        this.$searchFormWrapper.appendChild(this.createSearchInput())   
    }
}