import {LitElement, html, customElement, css, internalProperty} from 'lit-element';
import {i18n} from "../../directives/i18n";
import {inputValue} from "../../utils/LitElements";
import type {AMICode, Team} from "../../models/User";

@customElement('new-user-form')
export class NewUserForm extends LitElement {
    static get styles() { return Object.values(window.constructibleStyleSheets)
        // language=css
        .concat(css`
        `);
    }

    @internalProperty() amiCode: AMICode = ["0000", "0000", "0000"];
    @internalProperty() amiCodeErrorShown = false;
    @internalProperty() team: Team = "instinct";
    @internalProperty() level: number = 40;
    @internalProperty() nickname: string = "";

    constructor() {
        super();
    }

    render() {
        return html`
      <fieldset class="fieldset">
        <legend>${i18n('registration-page.new-user')}</legend>
    
        <div class="grid-container grid-x grid-margin-x fluid">
          <div class="cell large-4 medium-8">
            <label>${i18n('registration-page.your-ami-code.label')} <em>(ℹ️ ${i18n('registration-page.your-ami-code.description')})</em>
                <div class="error-msg" style="display: ${this.amiCodeErrorShown?'block':'none'}">⚠️ ${i18n('registration-page.your-ami-code.already-used')}</div>
                <div class="input-group">
                    <input id="amiCode0" type="text" .value="${this.amiCode[0]}" @change="${this.amiCodeChanged}" minlength="4" maxlength="4" class="input-group-field text-center" placeholder="0000">
                    <span class="input-group-label">-</span>
                    <input id="amiCode1" type="text" .value="${this.amiCode[1]}" @change="${this.amiCodeChanged}" minlength="4" maxlength="4" class="input-group-field text-center" placeholder="0000">
                    <span class="input-group-label">-</span>
                    <input id="amiCode2" type="text" .value="${this.amiCode[2]}" @change="${this.amiCodeChanged}" minlength="4" maxlength="4" class="input-group-field text-center" placeholder="0000">
                    <span class="input-group-label"><span style="display: ${this.amiCodeErrorShown?'none':'inline'}">✅</span><span style="display: ${this.amiCodeErrorShown?'inline':'none'}">❌</span></span>
                </div>
            </label>
          </div>
          <div class="cell large-8 medium-4">
            <label>${i18n('registration-page.your-team.label')}
                <div class="input-group">
                    <select id="team" class="input-group-field" .value="${this.team}" @change="${this.teamChanged}">
                      <option value="instinct">${i18n('teams.instinct.long')}</option>
                      <option value="valor">${i18n('teams.valor.long')}</option>
                      <option value="mystic">${i18n('teams.mystic.long')}</option>
                    </select>
                </div>
            </label>
          </div>
          <div class="cell large-1 medium-2">
            <label>${i18n('registration-page.your-level.label')}
                <input id="level" type="number" min="1" max="40" .value="${this.level}" @change="${this.levelChanged}">
            </label>
          </div>          
          <div class="cell large-11 medium-10">
            <label>${i18n('registration-page.your-nickname.label')} <em>(ℹ️ ${i18n('registration-page.your-nickname.description')})</em>
              <input id="nickname" type="text" .value="${this.nickname}" @change="${this.nicknameChanged}">
            </label>
          </div>
          <div class="cell">
            <button @click="${this.registerUser}" ?disabled="${this.validRegistrationForm()}" type="button" class="success button primary">${i18n('registration-page.register-user')}</button>
          </div>
        </div>
      </fieldset>
    `;
    }

    private registerUser() {
        console.log(JSON.stringify({
            amiCode: this.amiCode,
            team: this.team,
            level: this.level,
            nickname: this.nickname
        }));
    }

    private validRegistrationForm(): boolean {
        return this.amiCodeErrorShown;
    }

    private levelChanged() {
        this.level = Number(inputValue(this, "#level")!);
    }
    private nicknameChanged() {
        this.nickname = inputValue(this, "#nickname")!;
    }
    private teamChanged() {
        this.team = inputValue(this, "#team")! as Team;
    }

    private amiCodeChanged() {
        this.amiCode = [
            inputValue(this, "#amiCode0")!,
            inputValue(this, "#amiCode1")!,
            inputValue(this, "#amiCode2")!
        ];
        this.amiCodeErrorShown = !this.amiCodeErrorShown;
    }
}
