import {I18nMessages, LanguageCode} from "../models/I18nMessages";


interface StartOpts {
    defaultLang: LanguageCode;
}

const i18nMessages = new I18nMessages();

export const States = {
    i18n: i18nMessages,
    start(opts: StartOpts) {
        return i18nMessages.load(opts.defaultLang);
    }
};