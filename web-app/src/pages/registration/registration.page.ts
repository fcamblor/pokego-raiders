import {LitElement, html, customElement, css} from 'lit-element';
import {States} from "../../core/States";
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

    alert() {
        alert('You have pressed a button.');
    }

    render() {
        return html`
    ${i18n('registration-page.title')}
    <div class="grid-container fluid">
      <fieldset class="fieldset">
        <legend>${i18n('registration-page.new-user')}</legend>
    
        <div class="grid-container grid-x grid-margin-x fluid">
          <div class="cell large-4 medium-8">
            <label>${i18n('registration-page.your-ami-code.label')} <em>(ℹ️ ${i18n('registration-page.your-ami-code.description')})</em>
                <div class="input-group">
                    <input type="number" minlength="4" maxlength="4" class="input-group-field text-center" placeholder="0000">
                    <span class="input-group-label">-</span>
                    <input type="number" minlength="4" maxlength="4" class="input-group-field text-center" placeholder="0000">
                    <span class="input-group-label">-</span>
                    <input type="number" minlength="4" maxlength="4" class="input-group-field text-center" placeholder="0000">
                    <span class="input-group-label">✅❌</span>
                </div>
            </label>
          </div>
          <div class="cell large-8 medium-4">
            <label>${i18n('registration-page.your-team.label')}
                <div class="input-group">
                    <select class="input-group-field">
                      <option value="instinct">${i18n('teams.instinct.long')}</option>
                      <option value="valor">${i18n('teams.valor.long')}</option>
                      <option value="mystic">${i18n('teams.mystic.long')}</option>
                    </select>
                </div>
            </label>
          </div>
          <div class="cell large-1 medium-2">
            <label>${i18n('registration-page.your-level.label')}
                <select>
                  ${[...Array(40).keys()].reverse().map(n => html`<option value='${n+1}'>${n+1}</option>`)}
                </select>
            </label>
          </div>          
          <div class="cell large-11 medium-10">
            <label>${i18n('registration-page.your-nickname.label')} <em>(ℹ️ ${i18n('registration-page.your-nickname.description')})</em>
              <input type="text">
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset class="fieldset">
        <legend>${i18n('registration-page.existing-user')}</legend>
    
        <div class="grid-container grid-x grid-margin-x fluid">
          <div class="cell">
            <label>${i18n('registration-page.your-account-token.label')}
                <textarea rows="3"></textarea>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
        
        <button @click="${this.alert}" type="button" class="success button primary">Hello world !</button>
    `;
    }
}
