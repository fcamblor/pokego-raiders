import {I18nMessages, LanguageCode} from "../models/I18nMessages";
import type {User} from "../models/User";


interface StartOpts {
    defaultLang: LanguageCode;
}

const i18nMessages = new I18nMessages();

interface IStates {
    currentUser: User|undefined;
    i18n: I18nMessages;
    start(opts: StartOpts): Promise<void>;
}

export const States: IStates = {
    currentUser: undefined,
    i18n: i18nMessages,
    start(opts: StartOpts) {
        return i18nMessages.load(opts.defaultLang);
    }
};