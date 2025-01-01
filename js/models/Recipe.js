export class Recipe {
    constructor(data) {
        // Utilisation de valeurs par défaut si les propriétés ne sont pas définies dans le data
        this._id = data.id || null;
        this._image = data.image || 'default-image.jpg'; // Exemple d'image par défaut
        this._name = data.name || 'Nom non défini';
        this._servings = data.servings || 1; // Valeur par défaut de 1 portion
        this._ingredients = data.ingredients || []; // Tableau vide par défaut
        this._time = data.time || 0; // Par défaut, 0 minutes de préparation
        this._description = data.description || 'Pas de description';
        this._appliance = data.appliance || ''; // Vide si non spécifié
        this._ustensils = data.ustensils || []; // Tableau vide si non spécifié
    }

    // Getters
    get id() {
        return this._id;
    }

    get image() {
       return this._image;
    }

    get imgSrc() {
         return `./assets/images/${this._image}`;
    }

    get name() {
        return this._name;
    }

    get servings() {
        return this._servings;
    }

    get ingredients() {
        return this._ingredients;
    }

    get time() {
        return this._time;
    }

    get description() {
        return this._description;
    }

    get appliance() {
        return this._appliance;
    }

    get ustensils() {
        return this._ustensils;
    }
}