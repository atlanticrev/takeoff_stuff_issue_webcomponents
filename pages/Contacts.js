class Contacts extends HTMLElement {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.onAddContact = this.onAddContact.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    getTemplate () {
        return `
            <div class="contact-list-controls">
                <label class="contacts-search">
                    <input name="search" type="text" placeholder="Search by name"/>
                </label>
                <button class="btn-add-contact">add contact</button>
            </div>
        `.trim();
    }

    setTemplate () {
        this.innerHTML = this.getTemplate();
    }

    connectedCallback () {
        this.setTemplate();
        this.btnAddContact = this.querySelector('.btn-add-contact');
        this.searchInput = this.querySelector('[name="search"]');
        this.contactList = new ContactList();
        this.appendChild(this.contactList);
        this.addEventListener('click', this.onClick);
        this.searchInput.addEventListener('keyup', this.onInputChange);
    }

    onClick (e) {
        if (e.target === this.btnAddContact) {
            this.onAddContact();
        }
    }

    onAddContact () {
        this.modal = new UpdateContactModal(this, {}, this.onAddConfirmed);
        this.modal.show();
    }

    onAddConfirmed (data) {
        this.contactList.addContact(data);
    }

    onInputChange () {
        const searchString = this.searchInput.value;
        this.contactList.filterContactsList(searchString);
    }

}

customElements.define('takeoff-contacts', Contacts);