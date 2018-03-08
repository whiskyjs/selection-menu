import {debounce} from "@common/lib";
import {SelectionMenu} from "@inject/components";

(() => {
    let mouseX: number;
    let mouseY: number;
    let leftClick: boolean = false;
    let selectionMenu: SelectionMenu;

    const showMenu = debounce((_e: MouseEvent) => {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (text && (text.length > 1) && !leftClick) {
            selectionMenu.show(mouseX, mouseY, text, () => {
                window.getSelection().removeAllRanges();
            });
        }
    }, 200);

    const isTextInput = (e: Element): boolean => !!~["INPUT", "TEXTAREA"].indexOf(e.tagName);

    document.addEventListener("DOMContentLoaded", () => {
        selectionMenu = new SelectionMenu();
        selectionMenu.attach();

        document.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                leftClick = true;
            }

            selectionMenu.hide();
        });

        document.addEventListener("mouseup", (e) => {
            if (e.button === 0) {
                const textInputActive = isTextInput(document.activeElement);

                leftClick = false;

                if (!selectionMenu.visible && (!textInputActive || (textInputActive && e.ctrlKey))) {
                    showMenu(e);
                }
            }
        });

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
    });
})();
