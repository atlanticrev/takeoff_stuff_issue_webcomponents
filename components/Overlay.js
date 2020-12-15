class Overlay extends HTMLElement {

    constructor () {
        super();
        this.isOpen = false;
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
    }

    show () {
        this.isOpen = true;
        this.classList.add('show');
    }

    hide () {
        this.isOpen = false;
        this.classList.remove('show');
    }

    remove () {
        this.addEventListener('transitionend', this.onTransitionEnd);
        this.classList.add('animate');
    }

    onTransitionEnd () {
        this.classList.remove('animate');
        this.removeEventListener('transitionend', this.onTransitionEnd);
        this.parentElement.removeChild(this);
    }

}

customElements.define('takeoff-overlay', Overlay);