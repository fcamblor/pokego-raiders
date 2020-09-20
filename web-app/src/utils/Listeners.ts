
export type ListenerRemover = () => void;
export type ValueChangedCallback<T> = (oldLang: T|undefined, newLang: T) => void;
interface ListenerDefinition<T> {
    onChanged: ValueChangedCallback<T>;
    callbackRemover: ListenerRemover;
}

export class Listeners<T> {
    private definitions: ListenerDefinition<T>[];
    constructor() {
        this.definitions = [];
    }

    public register(listener: ValueChangedCallback<T>): ListenerRemover {
        const index = this.definitions.length;
        const listenerRemover = () => this.definitions.splice(index, 1);
        this.definitions.push({ onChanged: listener, callbackRemover: listenerRemover });
        return listenerRemover;
    }

    public fire(oldValue: T|undefined, newValue: T): void {
        this.definitions.forEach(def => def.onChanged(oldValue, newValue));
    }
}