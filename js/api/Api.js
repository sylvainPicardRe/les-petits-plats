class Api {
    /**
     * 
     * @param {string} url
     */
    constructor(url) {
        this._url = url;
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res.data)
            .catch(err => console.log('erreur', err))
    }
}

class RecipeApi extends Api {
    /**
     * 
     * @param {string} url
     */

    constructor(url) {
        super(url)
    }

    async getRecipes() {
        const recipes = await this.get()
        return recipes
    }
}