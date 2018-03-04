/**
 * Main types.
 */
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

/**
 * Type declarations for safe message passing.
 */
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

/**
 * Common types.
 */

export type DebouncedFunction = (...args: any[]) => any;
