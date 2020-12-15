class Router {

    constructor () {
        this.rootEl = document.querySelector('#root');

        this.routes = {
            contacts: document.createElement('takeoff-contacts'),
            login: document.createElement('takeoff-login'),
        }

        this.onAuth = this.onAuth.bind(this);

        this.routes.login.addEventListener('EVENT_LOGIN_AUTHORIZED', this.onAuth);
    }

    setRoute (route) {
        if (!this.rootEl.children.length) {
            this.rootEl.appendChild(this.routes[route]);
        } else {
            this.rootEl.replaceChild(this.routes[route], this.rootEl.firstChild);
        }
    }

    onAuth () {
        console.log('authorized');
        this.setRoute('contacts');
    }

}