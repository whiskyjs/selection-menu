export abstract class Action<T>  {
    constructor(public text: string) {}

    public abstract get uid(): string;
    public abstract get applicable(): boolean;

    public abstract perform(): Promise<T>;
    public abstract bind(a: HTMLAnchorElement): boolean;

    protected sendMessage(payload: ActionPerformPayload, type: string = "action.perform"): void {
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

export type ActionPerformPayload = OpenTabActionPerformPayload;

export interface OpenTabActionPerformPayload {
    kind: "open-tab";
    url: string;
}

export type AnyFunction = (...args: any[]) => any;
