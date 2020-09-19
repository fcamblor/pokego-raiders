import { LitElement, html, customElement } from 'lit-element';

@customElement('registration-page')
export class RegistrationPage extends LitElement {
    static get styles() { return Object.values(window.constructibleStyleSheets); }

    alert() {
        alert('You have pressed a button.');
    }

    render() {
        return html`
        Registration page !!!
        <button @click="${this.alert}" type="button" class="success button primary">Hello world !</button>
    `;
    }
}
