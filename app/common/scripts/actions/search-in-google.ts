import {Action} from "@common/types";

export class SearchInGoogleAction extends Action<void> {
    private static pattern: string = "http://www.google.com/search?q=%term%";

    get applicable() {
        return true;
    }

    get uid() {
        return "search_in_google";
    }

    public bind(_a: HTMLAnchorElement): boolean {
        return false;
    }

    public async perform(): Promise<void> {
        this.sendMessage({
            kind: "open-tab",
            url: SearchInGoogleAction.pattern.replace(/%term%/gm, encodeURIComponent(this.text)),
        });
    }
}
