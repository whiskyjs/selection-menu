export abstract class Action<T> {
    constructor(public text: string) {}

    abstract get uid(): string;

    public abstract perform(): Promise<T>;
    public abstract bind(a: HTMLAnchorElement): boolean;

    protected sendMessage(payload: ActionPerformPayload, type: string = "action.perform") {
        chrome.runtime.sendMessage({
            payload,
            type,
        });
    }
}

export type Message = ActionPerformMessage;

export interface ActionPerformMessage {
    type: "action.perform";
    payload: ActionPerformPayload;
}

export type ActionPerformPayload = SearchActionPerformPayload;

export interface SearchActionPerformPayload {
    kind: "search";
    url: string;
}

export type AnyFunction = (...args: any[]) => any;
