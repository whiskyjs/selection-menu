import {Action} from "@common/types";

export class OpenUrlAction extends Action<void> {
    private static pattern: RegExp =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    get applicable(): boolean {
        return OpenUrlAction.pattern.test(this.text);
    }

    get uid() {
        return "open_url";
    }

    public bind(_a: HTMLAnchorElement): boolean {
        return false;
    }

    public async perform(): Promise<void> {
        this.sendMessage({
            kind: "open-tab",
            url: this.text,
        });
    }
}
