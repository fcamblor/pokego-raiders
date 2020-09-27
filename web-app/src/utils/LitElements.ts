import type {LitElement} from "lit-element";

export const inputValue = function<T>(element: LitElement, selector: string): string|undefined {
    return (element.shadowRoot!.querySelectorAll(selector)[0] as HTMLInputElement)?.value;
}