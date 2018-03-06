import actions from "@common/actions";

export class SelectionMenu {
    protected static readonly CURSOR_WIDTH = 20;
    protected static readonly MARGIN_Y = 8;
    protected static readonly MARGIN_X = 8;

    protected static readonly containerTemplate = `
    <link rel="stylesheet" type="text/css" href=%inject.css%>
    <div class="container" style="opacity: 0">
    </div>
    `;

    protected outer: HTMLDivElement;
    protected shadowRoot: ShadowRoot;
    protected container: HTMLDivElement;

    constructor() {
        this.outer = document.createElement("div");
        this.outer.dataset.chromeExtension = "selection-menu";
        this.shadowRoot = this.outer.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = SelectionMenu.containerTemplate.replace(
            /%inject\.css%/gm,
            chrome.runtime.getURL("styles/inject.css"),
        );
        this.container = this.shadowRoot.querySelector(".container") as HTMLDivElement;
    }

    /**
     * Attach the root element to the document.
     */
    public attach() {
        document.body.appendChild(this.outer);
    }

    /**
     * Show the container relative to the target coordinates. Handles edge cases.
     * @param x
     * @param y
     * @param text Currently selected text
     */
    public show(x: number, y: number, text: string, onClose?: () => void) {
        this.fillWithActions(text, onClose);

        let left: number;
        let top: number;

        if (y < this.container.offsetHeight + SelectionMenu.MARGIN_Y * 2) {
            top = y + SelectionMenu.MARGIN_Y;
        } else {
            top = y - SelectionMenu.MARGIN_Y - this.container.offsetHeight;
        }

        if (x < this.container.offsetWidth / 2 + SelectionMenu.MARGIN_X) {
            left = x + SelectionMenu.CURSOR_WIDTH;
            top = y - this.container.offsetHeight / 2;
        } else if (x + this.container.offsetWidth / 2 + SelectionMenu.MARGIN_X > window.innerWidth) {
            left = x - this.container.offsetWidth - SelectionMenu.MARGIN_X - SelectionMenu.CURSOR_WIDTH;
            top = y - this.container.offsetHeight / 2;
        } else {
            left = x - this.container.offsetWidth / 2;
        }

        this.position(left, top);

        this.container.classList.add("container--visible");
    }

    public get visible() {
        return this.container.classList.contains("container--visible");
    }

    /**
     * Hide the container outside viewport.
     */
    public hide() {
        this.container.classList.remove("container--visible");

        setTimeout(() => {
            this.position(-9999, -9999);
            this.clearActions();
        }, 100);
    }

    /**
     * Set left and top of the container element.
     * @param x
     * @param y
     */
    protected position(x: number, y: number): void {
        this.container.style.left = `${window.pageXOffset + x}px`;
        this.container.style.top = `${window.pageYOffset + y}px`;
    }

    /**
     * Fill the container with action elements and set event handlers.
     * The only currently supported action event is click.
     * @param text Currently selected text
     */
    protected fillWithActions(text: string, onClose?: () => void) {
        const separator = this.createSeparator();

        for (const klass of actions) {
            const action = new klass(text);

            if (!action.applicable) {
                continue;
            }

            const actionElement = document.createElement("a");
            actionElement.href = "#";
            actionElement.classList.add("container__action");

            const bound = action.bind(actionElement);
            if (!bound) {
                actionElement.textContent = chrome.i18n.getMessage(`action_${action.uid}_name`);

                for (const event of ["mousedown", "mouseup"]) {
                    actionElement.addEventListener(event, this.silenceEvent);
                }

                actionElement.addEventListener("click", async (e) => {
                    e.preventDefault();

                    await action.perform();

                    this.hide();

                    if (typeof onClose !== "undefined") {
                        onClose();
                    }
                });
            }

            this.container.appendChild(actionElement);

            if (klass !== actions[actions.length - 1]) {
                this.container.appendChild(separator.cloneNode(true));
            }
        }
    }

    /**
     * Remove all action elements from the container.
     */
    protected clearActions() {
        this.container.innerHTML = ``;
    }

    /**
     * Stop propagation of an event.
     * @param e
     */
    protected silenceEvent(e: Event) {
        e.stopPropagation();
    }

    /**
     * Creates separator element for action menu.
     */
    protected createSeparator(): HTMLDivElement {
        const separatorElement = document.createElement("div");
        const separatorInnerElement = document.createElement("div");

        separatorElement.classList.add("container__separator");
        separatorInnerElement.classList.add("container__separator-inner");
        separatorElement.appendChild(separatorInnerElement);

        return separatorElement;
    }
}
