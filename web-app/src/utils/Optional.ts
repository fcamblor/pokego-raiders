

export class Optional<T> {
    private constructor(private readonly _value: T|null, private readonly _isAbsent: boolean){}

    public isDefined(): boolean { return !this._isAbsent; }
    public isAbsent(): boolean { return this._isAbsent; }
    public whenDefined(callback: (value: T) => void) {
        if(this.isDefined()) {
            callback(this._value as T);
        }
    }

    public ensureDefinedThenGet(): T {
        if(this.isAbsent()) {
            throw new Error("Error when retrieving Optional value");
        }
        return this._value as T;
    }

    public map<U>(transformer: (v: T) => U): Optional<U> {
        return this.isDefined()?Optional.fromNullable(transformer(this._value as T)):Optional.absent<U>();
    }
    public flatMap<U>(transformer: (v: T) => Optional<U>): Optional<U> {
        return this.isDefined()?transformer(this._value as T):Optional.absent();
    }

    public orElse(value: T): T {
        return this.isDefined()?this._value as T:value;
    }
    public getOrElse(callback: () => T): T {
        return this.isDefined()?this._value as T:callback();
    }
    public orNull(): T|null {
        return this.isDefined()?this._value:null;
    }
    public mapIfAbsent(supplier: () => Optional<T>): Optional<T> {
        return this.isAbsent()?supplier():this;
    }
    public cast<U extends T>(): Optional<U> {
        return Optional.fromNullable<U>(this._value as U);
    }

    public static of<T>(value: T) { return new Optional<T>(value, false); }
    public static absent<T>() { return new Optional<T>(null, true); }
    public static fromNullable<T>(value: T|null|undefined) { return new Optional<T>(value as T, value === null || value === undefined); }
}
