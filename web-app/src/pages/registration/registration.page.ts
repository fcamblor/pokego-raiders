import {LitElement, html, customElement} from 'lit-element';
import {States} from "../../core/States";
import {i18n} from "../../directives/i18n";

@customElement('registration-page')
export class RegistrationPage extends LitElement {
    static get styles() { return Object.values(window.constructibleStyleSheets); }

    constructor() {
        super();
    }

    alert() {
        alert('You have pressed a button.');
    }

    render() {
        return html`
        ${i18n('registration-page.title')}
        <button @click="${this.alert}" type="button" class="success button primary">Hello world !</button>
    `;
    }
}
