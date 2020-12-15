class Modal extends HTMLElement {

    constructor (caller, options, confirmCallback) {
        super();
        Object.assign(this, options);
        this.isOpen = false;
        this.caller = caller;
        this.confirmCallback = confirmCallback;
        this.overlay = new Overlay();

        this.onCLick = this.onCLick.bind(this);
        this.onEscape = this.onEscape.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.classList.add('modal');

        this.mount();
    }

    connectedCallback () {
        this.setTemplate();
        document.addEventListener('keyup', this.onEscape);
        document.body.appendChild(this.overlay);
        this.btnCancel = this.querySelector('.btn-modal-cancel');
        this.btnConfirm = this.querySelector('.btn-modal-confirm');
        this.addEventListener('click', this.onCLick);
    }

    disconnectedCallback () {
        document.removeEventListener('keyup', this.onEscape);
        document.body.removeChild(this.overlay);
    }

    /**
     * @abstract
     */
    getTemplate () {}

    setTemplate () {
        this.innerHTML = this.getTemplate();
    }

    show () {
        this.isOpen = true;
        this.overlay.show();
        this.classList.add('show');
    }

    hide () {
        this.isOpen = false;
        this.overlay.hide();
        this.classList.remove('show');
    }

    mount () {
        document.body.appendChild(this);
    }

    unmount () {
        document.body.removeChild(this);
    }

    onConfirm () {
        this.hide();
        this.confirmCallback.call(this.caller);
        this.unmount();
    }

    onCancel () {
        this.hide();
        this.unmount();
    }

    onCLick (e) {
        if (e.target === this.btnCancel) {
            this.onCancel();
        } else if (e.target === this.btnConfirm) {
            this.onConfirm();
        }
    }

    onEscape (e) {
        if (e.key === 'Escape') {
            this.onCancel();
        }
    }

}

customElements.define('takeoff-modal', Modal);