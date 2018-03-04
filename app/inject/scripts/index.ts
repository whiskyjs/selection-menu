import {debounce} from "@common/lib";
import {SelectionMenu} from "@inject/components";

(() => {
    let mouseX: number;
    let mouseY: number;
    let selectionMenu: SelectionMenu;

    const showMenu = debounce((_e: MouseEvent) => {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (text && (text.length > 1)) {
            selectionMenu.show(mouseX, mouseY, text);
        }
    }, 200);

    document.addEventListener("DOMContentLoaded", () => {
        selectionMenu = new SelectionMenu();
        selectionMenu.attach();

        document.addEventListener("mousedown", (_e) => {
            selectionMenu.hide();
        });

        document.addEventListener("mouseup", (e) => {
            if (e.button === 0) {
                showMenu(e);
            }
        });

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
    });
})();
