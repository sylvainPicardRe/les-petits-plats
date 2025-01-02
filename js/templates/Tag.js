class Tag {
    constructor(tag) {
        this._tag = tag
    }

    createTag() {
        const $wrapper = document.createElement( 'div' )
        $wrapper.classList.add('tag')
        $wrapper.classList.add('px-3')
        $wrapper.classList.add('py-4')

        const tag = `
            <a href="#${this._tag}">
                <p>${this._tag}</p>
                <i class="fa-solid fa-xmark"></i>
            </a>
        `
        
        $wrapper.innerHTML = tag
        return $wrapper
    } 
}