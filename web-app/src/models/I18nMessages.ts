import {ListenerRemover, Listeners, ValueChangedCallback} from "../utils/Listeners";

export type LanguageCode = "fr" | "en";

export type Translation = Record<string, TranslationNode>;

// Someday, we will be able to have a type safer way of representing this
// see https://twitter.com/karoljmajewski/status/1303827023383662592?s=19
export type TranslationKey = string;

// @ts-ignore
export type TranslationNode = Record<string, TranslationNode> | string;

export class I18nMessages {
    private currentLang: LanguageCode|undefined;
    private translations: Translation;
    private cachedTranslations: Record<TranslationKey, string>;

    private languageChangedListeners: Listeners<LanguageCode>;

    constructor() {
        this.currentLang = undefined;
        this.translations = {};
        this.cachedTranslations = {};
        this.languageChangedListeners = new Listeners<LanguageCode>();
    }

    public load(lang: LanguageCode): Promise<void> {
        return import(`../i18n/Messages_${lang}.js`).then(module => {
            const oldLang = this.currentLang;
            this.currentLang = lang;
            this.translations = module.TRANSLATIONS as Translation;
            this.cachedTranslations = {};
            this.languageChangedListeners.fire(oldLang, lang);
        });
    }

    public get(messageKey: TranslationKey, args?: Record<string, string>): string|undefined {
        const translation = this.cachedTranslations[messageKey] || this.resolveTranslation(messageKey);
        let interpolatedTranslation;
        if(args && translation) {
            interpolatedTranslation = Object.entries(args).reduce((inProgressInterpolation, [key, value], index) => {
                return inProgressInterpolation.replace(`{{${key}}}`, value);
            }, translation);
        } else {
            interpolatedTranslation = translation;
        }
        return interpolatedTranslation;
    }

    public onLanguageChanged(callback: ValueChangedCallback<LanguageCode>): ListenerRemover {
        return this.languageChangedListeners.register(callback);
    }

    private resolveTranslation(messageKey: TranslationKey): string|undefined {
        const paths = messageKey.split(".");
        const result = paths.reduce((currentNode, path, index) => {
            return currentNode ? currentNode[path] : undefined;

        }, this.translations) as unknown as string;

        if(!result) {
            this.cachedTranslations[messageKey] = result;
        }

        return result;
    }
}