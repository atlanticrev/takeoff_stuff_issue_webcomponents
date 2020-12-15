class UpdateContactModal extends Modal {

    constructor (...args) {
        super(...args);
    }

    getTemplate () {
        return `
            <h3 class="modal-text">${this.data ? 'Edit contact' : 'Create new contact'}</h3>
            <form id="add-contact-form">
                <label>
                    <input 
                        type="text" 
                        value="${this.data ? this.data.name : ''}"
                        name="name" 
                        placeholder="Name" 
                        required
                    />
                </label>
                <label>
                    <input 
                        type="text" 
                        value="${this.data ? this.data.email : ''}"
                        name="email" 
                        placeholder="Email" 
                        required
                    />
                </label>
                <label>
                    <input 
                        type="text" 
                        value="${this.data ? this.data.phone : ''}"
                        name="phone" 
                        placeholder="Phone" 
                        required
                    />
                </label>
                <label>
                    <input 
                        type="text" 
                        value="${this.data ? this.data.website : ''}"
                        name="website" 
                        placeholder="Website" 
                        required
                    />
                </label>
            </form>
            <div class="modal-controls">
                <button class="btn-modal-confirm">apply</button>
                <button class="btn-modal-cancel">cancel</button>
            </div>
        `.trim();
    }

    onConfirm () {
        const fields = Array.from(this.querySelectorAll('input'));
        const formIsValid = fields.reduce((result, input) => input.checkValidity() && result, true);
        if (formIsValid) {
            this.hide();
            const data = {};
            fields.forEach(field => data[field.name] = field.value);
            this.confirmCallback.call(this.caller, data);
            this.unmount();
        }
    }

}

customElements.define('takeoff-update-contact-modal', UpdateContactModal);