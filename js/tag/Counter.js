class TagListCounter {
    constructor() {
        this._count = 0

        this._list = []
    }

    update(action, element) {
        if(action === 'add') {
            this._list.push(element)
        } else if (action === 'remove') {
            this._list = this._list.filter(tag => tag !== element)
        } else {
            throw 'Action Inconnue'
        }
    }

}