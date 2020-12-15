class Login extends HTMLElement {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getTemplate () {
        return `
            <h3 class="login-text">Authentication</h3>
            <form action="#">
                <label for="login">
                    <input name="login" id="login" type="text" placeholder="Login" required/>
                </label>
                <label for="password">
                    <input name="password" id="password" type="password" placeholder="Password" required/>
                </label>
                <div class="login-controls">
                    <button name="submit" type="submit">submit</button>
                    <button name="reset" type="reset">reset</button>
                </div>
            </form>
        `.trim();
    }

    setTemplate () {
        this.innerHTML = this.getTemplate();
    }

    connectedCallback () {
        this.setTemplate();
        this.btnSubmit = this.querySelector('[name="submit"]');
        this.addEventListener('click', this.onClick);
    }

    onClick (e) {
        if (e.target === this.btnSubmit) {
            e.preventDefault();
            const fields = Array.from(this.querySelectorAll('input'));
            const formIsValid = fields.reduce((result, input) => input.checkValidity() && result, true);
            formIsValid && this.onSubmit();
        }
    }

    onSubmit () {
        // Mock authorization
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(() => this.dispatchEvent(new CustomEvent('EVENT_LOGIN_AUTHORIZED', {bubbles: true})))
        .catch(() => console.log('unauthorized'));
    }

}

customElements.define('takeoff-login', Login);