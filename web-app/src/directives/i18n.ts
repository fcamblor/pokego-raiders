import {directive, Part} from "lit-html";
import {States} from "../core/States";

export const i18n = directive((key: string) => {
    return (part: Part) => {
        part.setValue(States.i18n.get(key));

        // IMPORTANT NOTE : Here, part is leaking and won't be garbage collected due to listener below
        // This is something which is addressed by lit-html team for lit-html 2.0 (in pre-release at the time of writing)
        // See https://github.com/Polymer/lit-html/issues/283#issuecomment-696748310

        const i18nLanguageChangedCallbackRemover = States.i18n.onLanguageChanged(() => {
            part.setValue(States.i18n.get(key));
            part.commit();
        });

        // TODO: when we will have something like part.onDisconnect(), bind i18nLanguageChangedCallbackRemover()
        // on it
    };
});
