class ContactList extends HTMLElement {

    constructor() {
        super();
        this.contactsData = [];
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    connectedCallback () {
        this.getContactsData()
            .then(() => this.fillContactsList(this.contactsData));
        this.addEventListener('EVENT_CONTACT_DELETE', this.onDelete);
        this.addEventListener('EVENT_CONTACT_EDIT', this.onEdit);
    }

    getContactsData () {
        return fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => this.contactsData = data)
            .catch((err) => console.error('Fetch error', err));
    }

    fillContactsList (contacts) {
        contacts.forEach((data) => {
            this.appendChild(new Contact(data));
        });
    }

    filterContactsList (string) {
        const filteredList = this.contactsData.filter(contact => contact.name.search(new RegExp(string, 'gi')) !== -1);
        this.innerHTML = '';
        this.fillContactsList(filteredList);
    }

    onEdit (e) {
        this._contactToEdit = e.detail.contact;
        this.modal = new UpdateContactModal(this, {data: this._contactToEdit.contactData}, this.onEditConfirmed);
        this.modal.show();
    }

    onEditConfirmed (data) {
        this.updateContact(data);
    }

    onDelete (e) {
        this._contactToDelete = e.detail.contact;
        this.modal = new ConfirmModal(this, {}, this.onDeleteConfirmed);
        this.modal.show();
    }

    onDeleteConfirmed () {
        this.removeContact();
    }

    removeContact () {
        // Update data
        this.contactsData.splice(this.contactsData.indexOf(this._contactToDelete.contactData), 1);
        // Update template
        for (let contactEl of this.children) {
            contactEl === this._contactToDelete && contactEl.remove();
        }
        delete this._contactToDelete;
    }

    addContact (data) {
        // Update data
        this.contactsData.push(data);
        // Update template
        let contactEl = new Contact(data);
        this.insertBefore(contactEl, this.firstChild);
        this.scrollTo(0, 0);
    }

    updateContact (data) {
        // Update data
        Object.assign(this._contactToEdit.contactData, data);
        delete this._contactToEdit;
    }

}

customElements.define('takeoff-contact-list', ContactList);