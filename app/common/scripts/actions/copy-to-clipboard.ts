import {Action} from "../types";

export class CopyToClipboardAction extends Action<void> {
    get applicable(): boolean {
        return true;
    }
    get uid() {
        return "copy_to_clipboard";
    }

    public bind(_a: HTMLAnchorElement): boolean {
        return false;
    }

    public async perform(): Promise<void> {
        document.execCommand("copy");
    }
}
