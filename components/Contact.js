class Contact extends HTMLElement {

    constructor(data) {
        super();
        this.contactData = data;
        this.onClick = this.onClick.bind(this);
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
    }

    /**
     * @return {string}
     */
    getTemplate () {
        return `
            <div class="contact-info">
                <span class="contact-name" data-prop="name">${this.contactData.name}</span>
                <span class="contact-email" data-prop="email">${this.contactData.email}</span>
                <span class="contact-phone" data-prop="phone">${this.contactData.phone}</span>
                <span class="contact-website" data-prop="website">${this.contactData.website}</span>
            </div>
            <div class="contact-controls">
                <button class="btn-edit-contact">edit</button>
                <button class="btn-delete-contact">delete</button>
            </div>
        `.trim();
    }

    setTemplate () {
        this.bindData();
        this.innerHTML = this.getTemplate();
    }

    bindData () {
        for (let name of Object.keys(this.contactData)) {
            if (name !== 'company' && name !== 'address' && name !== 'id') {
                let oldVal = this.contactData[name];
                Object.defineProperty(this.contactData, name, {
                    get: () => oldVal,
                    set: (newVal) => {
                        if (newVal !== oldVal) {
                            oldVal = newVal;
                            const contactEl = this.querySelector(`[data-prop="${name}"]`);
                            contactEl.textContent = newVal;
                            this.animateChange();
                        }
                    },
                });
            }
        }
    }

    connectedCallback () {
        this.setTemplate();
        this.btnEdit = this.querySelector('.btn-edit-contact');
        this.btnDelete = this.querySelector('.btn-delete-contact');
        this.addEventListener('click', this.onClick);
    }

    remove () {
        this.addEventListener('transitionend', this.onTransitionEnd);
        this.classList.add('fade-out');
    }

    onTransitionEnd () {
        this.removeEventListener('transitionend', this.onTransitionEnd);
        this.parentElement.removeChild(this);
    }

    onClick (e) {
        if (e.target === this.btnDelete) {
            this.dispatchEvent(new CustomEvent('EVENT_CONTACT_DELETE', {bubbles: true, detail: {contact: this}}));
        } else if (e.target === this.btnEdit) {
            this.dispatchEvent(new CustomEvent('EVENT_CONTACT_EDIT', {bubbles: true, detail: {contact: this}}));
        }
    }

    animateChange () {
        this.addEventListener('animationend', this.onChangeAnimationEnd);
        this.classList.add('change-data-animation');
    }

    onChangeAnimationEnd () {
        this.removeEventListener('animationend', this.onChangeAnimationEnd);
        this.classList.remove('change-data-animation');
    }

}

customElements.define('takeoff-contact', Contact);