import {customElement, html, LitElement} from "lit-element";
import {i18n} from "../../directives/i18n";


@customElement('communities-list-page')
export class CommunitiesPage extends LitElement {
    static get styles() { return Object.values(window.constructibleStyleSheets); }

    constructor() {
        super();
    }

    render() {
        return html`
        ${i18n('communities-list.title')}
    `;
    }
}
