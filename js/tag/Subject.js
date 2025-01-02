class TagListSubject {
    constructor() {
        this._observer = []
    }

    subscribe(observer) {
        this._observer.push(observer)
    }

    unsubscribe(observer) {
        this._observer = this._observer.filter(obs => obs !== observer)
    }

    fire(action, element) {
        this._observer.forEach(obs => obs.update(action, element))
    }
}