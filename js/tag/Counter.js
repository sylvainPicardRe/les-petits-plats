class TagListCounter {
    constructor() {
        this._count = 0

        this._list = []
    }

    update(action, element) {
        if(action === 'add') {
            this._list.push(element)
            console.log(this._list)
        } else if (action === 'DEC') {
            this._count -= 1
        } else {
            throw 'Action Inconnue'
        }
    }

}