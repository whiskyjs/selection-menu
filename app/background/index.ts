import {Message} from "@common/types";

chrome.runtime.onMessage.addListener((message: Message, _sender, _response) => {
    switch (message.type) {
        case "action.perform":
            if (message.payload.kind === "open-tab") {
                chrome.tabs.create({
                    active: true,
                    url: message.payload.url,
                });
            }
            break;
    }
});
