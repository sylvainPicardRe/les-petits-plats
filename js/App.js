class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipes-wrapper');

        this.recipesApi = new RecipeApi('./data/recipes.json');
        
        this.FullRecipes = [];

        //TagLib Pub/Sub
        this.TagListSubject = new TagListSubject()
        this.TagListCounter = new TagListCounter()

        this.TagListSubject.subscribe(this.TagListCounter)
    }

    async fetchRecipes() {
        const recipesData = await this.recipesApi.get();

        const Recipes = recipesData.map(recipe => new Recipe(recipe));

        this.FullRecipes = Recipes;
    }

    async renderFilterForm() {
        const Template = new FilterForm(this.FullRecipes, this.TagListSubject)
        Template.render()
    }

    async init() {
        await this.fetchRecipes();
        await this.renderFilterForm();

        this.FullRecipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)

            this.$recipesWrapper.appendChild(
                Template.createRecipeCard()
            )
        })
    }

    main() {
        this.init()
    }
}

const app = new App();
app.main();