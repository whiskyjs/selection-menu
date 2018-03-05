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
            selectionMenu.show(mouseX, mouseY, text);
        }
    }, 200);

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
                leftClick = false;

                if (!selectionMenu.visible) {
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
