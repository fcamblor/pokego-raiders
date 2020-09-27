import {LitElement, html, customElement, css, internalProperty} from 'lit-element';
import {i18n} from "../../directives/i18n";

@customElement('registration-page')
export class RegistrationPage extends LitElement {
    static get styles() { return Object.values(window.constructibleStyleSheets)
        // language=css
        .concat(css`
        `);
    }

    constructor() {
        super();
    }

    render() {
        return html`
    ${i18n('registration-page.title')}
    <div class="grid-container fluid">
      <new-user-form></new-user-form>
      <existing-user-form></existing-user-form>
    </div>
    `;
    }
}
