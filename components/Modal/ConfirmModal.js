class ConfirmModal extends Modal {

    getTemplate () {
        return `
            <h3 class="modal-text">Are you sure?</h3>
            <div class="modal-controls">
                <button class="btn-modal-confirm">confirm</button>
                <button class="btn-modal-cancel">cancel</button>
            </div>
        `.trim();
    }

}

customElements.define('takeoff-confirm-modal', ConfirmModal);