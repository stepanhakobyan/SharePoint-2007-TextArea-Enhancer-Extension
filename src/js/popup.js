window.addEventListener("load", (_ev) => {
    let save = document.getElementById("save0");
    save.addEventListener("click", (_ev) => {
        browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            if (tabs && tabs.length == 1) {
                if (tabs[0].url.indexOf("spserver") > 0) {
                    browser.tabs.sendMessage(tabs[0].id, { text: 'getReviewDetails' }, function (reviewText) {
                        console.log(reviewText);
                        var now = new Date();
                        window.localStorage.setItem("previousReviewText0", reviewText);
                        window.localStorage.setItem("previousReviewTime0", now.toLocaleString("en-GB"));
                        let textArea = document.getElementById("d0");
                        let timeSpan = document.getElementById("t0");
                        textArea.textContent = reviewText;
                        timeSpan.textContent = now.toLocaleString("en-GB");
                    });
                }
                else {
                    console.log(tabs[0].url);
                }
            }
            else {
                console.log("no tab");
            }
        });
    });
    for (let i = 0; i <= 5; i++) {
        let reviewText = window.localStorage.getItem(`previousReviewText${i}`);
        let time = window.localStorage.getItem(`previousReviewTime${i}`);
        if (reviewText) {
            let textArea = document.getElementById(`d${i}`);
            let timeSpan = document.getElementById(`t${i}`);
            textArea.textContent = reviewText;
            timeSpan.textContent = time;
        }
        let copy = document.getElementById(`copyToClipboard${i}`);
        copy.addEventListener("click", (ev) => {
            let textArea = document.getElementById(`d${i}`);
            textArea.select();
            document.execCommand('copy');
        });
        let restore = document.getElementById(`restoreText${i}`);
        restore.addEventListener("click", (ev) => {
            browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
                if (tabs && tabs.length == 1) {
                    if (tabs[0].url.indexOf("spserver") > 0) {
                        let textArea = document.getElementById(`d${i}`);
                        browser.tabs.sendMessage(tabs[0].id, { text: "restoreText", reviewText: textArea.textContent }, (succeed) => {
                            if (succeed) {
                                console.log("review resored");
                            }
                        });
                    }
                    else {
                        console.log(tabs[0].url);
                    }
                }
                else {
                    console.log("no tab");
                }
            });
        });
        let preview = document.getElementById(`preview${i}`);
        preview.addEventListener("click", (ev) => {
            let textArea = document.getElementById(`d${i}`);
            let previewBody = document.getElementById("previewBody");
            previewBody.innerHTML = textArea.textContent;
            let previewDiv = document.getElementById("previewDiv");
            previewDiv.style.visibility = "visible";
        });
    }
    let clearAll = document.getElementById("clearAll");
    clearAll.addEventListener("click", (ev) => {
        for (let i = 1; i <= 5; i++) {
            window.localStorage.removeItem(`previousReviewText${i}`);
            window.localStorage.removeItem(`previousReviewTime${i}`);
            let textArea = document.getElementById(`d${i}`);
            textArea.textContent = "";
            let timeSpan = document.getElementById(`t${i}`);
            timeSpan.textContent = "լրացված չէ";
        }
    });
    let closePreview = document.getElementById("closePreview");
    closePreview.addEventListener("click", (ev) => {
        let previewDiv = document.getElementById("previewDiv");
        previewDiv.style.visibility = "collapse";
    });
    let previewRestore = document.getElementById("previewRestore");
    previewRestore.addEventListener("click", (ev) => {
        browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            if (tabs && tabs.length == 1) {
                if (tabs[0].url.indexOf("spserver") > 0) {
                    let previewBody = document.getElementById("previewBody");
                    browser.tabs.sendMessage(tabs[0].id, { text: "restoreText", reviewText: previewBody.innerHTML }, (succeed) => {
                        if (succeed) {
                            console.log("preview resored");
                        }
                    });
                }
                else {
                    console.log(tabs[0].url);
                }
            }
            else {
                console.log("no tab");
            }
        });
    });
});
//# sourceMappingURL=popup.js.map