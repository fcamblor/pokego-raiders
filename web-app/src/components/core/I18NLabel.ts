import {LitElement, html, customElement, property, internalProperty} from 'lit-element';
import {States} from "../../core/States";
import {I18nMessages} from "../../models/I18nMessages";
import type {ListenerRemover} from "../../utils/Listeners";
import {directive, Part} from "lit-html";

@customElement('i18n-l')
export class I18NLabel extends LitElement {
    @property({ type: String }) key!: string;
    @property({ type: Object }) args?: Record<string,string>|undefined;
    @internalProperty({ hasChanged: () => true }) i18n!: I18nMessages;

    private i18nLanguageChangedCallbackRemover!: ListenerRemover;

    constructor() {
        super();
        this.i18n = States.i18n;
    }

    render() {
        return html`${this.i18n.get(this.key, this.args)}`;
    }

    connectedCallback() {
        super.connectedCallback();
        this.i18nLanguageChangedCallbackRemover = this.i18n.onLanguageChanged(() => {
            this.i18n = States.i18n;
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.i18nLanguageChangedCallbackRemover();
    }
}
