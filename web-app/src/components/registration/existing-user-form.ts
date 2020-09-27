import {LitElement, html, customElement, css, internalProperty} from 'lit-element';
import {i18n} from "../../directives/i18n";
import {inputValue} from "../../utils/LitElements";

@customElement('existing-user-form')
export class ExistingUserForm extends LitElement {
    static get styles() { return Object.values(window.constructibleStyleSheets)
        // language=css
        .concat(css`
        `);
    }

    @internalProperty() accountToken: string = "";

    constructor() {
        super();
    }

    render() {
        return html`
      <fieldset class="fieldset">
        <legend>${i18n('registration-page.existing-user')}</legend>
    
        <div class="grid-container grid-x grid-margin-x fluid">
          <div class="cell">
            <label>${i18n('registration-page.your-account-token.label')} <em>(ℹ️ ${i18n('registration-page.your-account-token.description')})</em>
                <textarea id="accountToken" .value="${this.accountToken}" @change="${this.accountTokenChanged}" rows="3"></textarea>
            </label>
          </div>
          <div class="cell">
            <button @click="${this.loadUser}" ?disabled="${!this.validRegistrationForm()}" type="button" class="success button primary">${i18n('registration-page.load-user')}</button>
          </div>
        </div>
      </fieldset>
    `;
    }

    private loadUser() {
        console.log(JSON.stringify({
            accountToken: this.accountToken
        }));
    }

    private validRegistrationForm(): boolean {
        return !!this.accountToken;
    }

    private accountTokenChanged() {
        this.accountToken = inputValue(this, "#accountToken")!;
        console.log(this.accountToken);
    }
}
