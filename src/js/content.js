if (!window.browser) {
    window.browser = window.chrome;
}
console.log("content.js");
// Listen for messages
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    // If the received message has the expected format...
    if (msg.text === "getReviewDetails") {
        let reviewArea = document.querySelector("textarea.ms-long");
        if (reviewArea != null) {
            sendResponse(reviewArea.textContent);
        }
    }
    else if (msg.text === "restoreText") {
        console.log("restoreText");
        let reviewArea = document.querySelector("textarea.ms-long");
        if (reviewArea == null) {
            console.log("restoreText not found");
            return;
        }
        console.info(reviewArea.id);
        let nicEditArr = document.getElementsByClassName("nicEdit-main");
        if (nicEditArr && nicEditArr.length > 0) {
            let nicEdit = nicEditArr[0];
            nicEdit.innerHTML = msg.reviewText;
        }
        sendResponse(true);
    }
    else if (msg.text === "checkSharePoint") {
        console.log("checkSharePoint");
        try {
            let n = new nicEditor();
            sendResponse(true);
        }
        catch (ex) {
            sendResponse(false);
        }
    }
    else {
        console.error(msg.text);
    }
});
function addNicEdit2() {
    console.log("starting addNicEdit2");
    let reviewArea = document.querySelector("textarea.ms-long");
    if (!reviewArea) {
        console.log("addNicEdit2 add stoped, no review area found");
        return;
    }
    try {
        let nicEdit = nicEditors.findEditor(reviewArea.id);
        console.log("test nicedit");
        console.log(nicEdit);
        if (!nicEdit) {
            let params = {};
            if (window.nicEditorIconsPath)
                params.iconsPath = window.nicEditorIconsPath;
            new nicEditor(params).panelInstance(reviewArea.id);
            console.log("addNicEdit2 succeeded");
            addMutationObserver2();
        }
    }
    catch (ex) {
        console.error(ex);
        console.log("addNicEdit2 failed");
    }
}
function addMutationObserver2() {
    let mute = new MutationObserver((evnt) => {
        console.log("Mutation callback");
        console.log(evnt);
        let reviewArea = document.querySelector("textarea.ms-long");
        let nicEdit = nicEditors.findEditor(reviewArea.id);
        let addArea = document.getElementById(reviewArea.id);
        addArea.textContent = nicEdit.getContent();
    });
    let nicEditArr = document.getElementsByClassName("nicEdit-main");
    if (nicEditArr && nicEditArr.length > 0) {
        let nicEdit = nicEditArr[0];
        let config = { attributes: true, childList: true, characterData: true };
        mute.observe(nicEdit, config);
        console.log("mute.observe started");
    }
    else {
        console.error("nicEdit-main not found");
    }
}
addNicEdit2();
//# sourceMappingURL=content.js.map