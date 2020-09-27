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
      <fieldset class="fieldset">
        <legend>${i18n('registration-page.existing-user')}</legend>
    
        <div class="grid-container grid-x grid-margin-x fluid">
          <div class="cell">
            <label>${i18n('registration-page.your-account-token.label')} <em>(ℹ️ ${i18n('registration-page.your-account-token.description')})</em>
                <textarea rows="3"></textarea>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    `;
    }
}
