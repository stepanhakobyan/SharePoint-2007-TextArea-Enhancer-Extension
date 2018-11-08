import * as redeclared from "./redeclare.js";

window.addEventListener<"load">("load", (_ev) => {
    let save = document.getElementById("save0") as HTMLButtonElement;
    save.addEventListener<"click">("click", (_ev) => {
        browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            if (tabs && tabs.length == 1) {
                if (tabs[0].url.indexOf("spserver") > 0) {
                    browser.tabs.sendMessage(tabs[0].id, { text: 'getReviewDetails' }, function (reviewText) {
                        console.log(reviewText);
                        var now = new Date();
                        window.localStorage.setItem("previousReviewText0", reviewText);
                        window.localStorage.setItem("previousReviewTime0", now.toLocaleString("en-GB"));
                        let textArea = document.getElementById("d0") as HTMLTextAreaElement;
                        let timeSpan = document.getElementById("t0") as HTMLSpanElement;
                        textArea.textContent = reviewText;
                        timeSpan.textContent = now.toLocaleString("en-GB");
                    });
                } else {
                    console.log(tabs[0].url);
                }
            } else {
                console.log("no tab");
            }
        });
    });


    for (let i = 0; i <= 5; i++) {
        let reviewText = window.localStorage.getItem(`previousReviewText${i}`);
        let time = window.localStorage.getItem(`previousReviewTime${i}`);
        if (reviewText) {
            let textArea = document.getElementById(`d${i}`) as HTMLTextAreaElement;
            let timeSpan = document.getElementById(`t${i}`) as HTMLSpanElement;
            textArea.textContent = reviewText;
            timeSpan.textContent = time;
        }
        let copy = document.getElementById(`copyToClipboard${i}`) as HTMLButtonElement;
        copy.addEventListener<"click">("click",
            (ev) => {
                let textArea = document.getElementById(`d${i}`) as HTMLTextAreaElement;
                textArea.select();
                document.execCommand('copy');
            });

        let restore = document.getElementById(`restoreText${i}`) as HTMLButtonElement;
        restore.addEventListener<"click">("click",
            (ev) => {
                browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
                    if (tabs && tabs.length == 1) {
                        if (tabs[0].url.indexOf("spserver") > 0) {
                            let textArea = document.getElementById(`d${i}`) as HTMLTextAreaElement;
                            browser.tabs.sendMessage(tabs[0].id, { text: "restoreText", reviewText: textArea.textContent },
                                (succeed: boolean) => {
                                    if (succeed) {
                                        console.log("review resored");
                                    }
                                });
                        } else {
                            console.log(tabs[0].url);
                        }
                    } else {
                        console.log("no tab");
                    }
                });
            });

        let preview = document.getElementById(`preview${i}`) as HTMLButtonElement;
        preview.addEventListener<"click">("click",
            (ev) => {
                let textArea = document.getElementById(`d${i}`) as HTMLTextAreaElement;
                let previewBody = document.getElementById("previewBody") as HTMLDivElement;
                previewBody.innerHTML = textArea.textContent;
                let previewDiv = document.getElementById("previewDiv") as HTMLDivElement;
                previewDiv.style.visibility = "visible";
            });

    }

    let clearAll = document.getElementById("clearAll") as HTMLButtonElement;
    clearAll.addEventListener<"click">("click",
        (ev) => {
            for (let i = 1; i <= 5; i++) {
                window.localStorage.removeItem(`previousReviewText${i}`);
                window.localStorage.removeItem(`previousReviewTime${i}`);
                let textArea = document.getElementById(`d${i}`) as HTMLTextAreaElement;
                textArea.textContent = "";
                let timeSpan = document.getElementById(`t${i}`) as HTMLTextAreaElement;
                timeSpan.textContent = "լրացված չէ";
            }
        });

    let closePreview = document.getElementById("closePreview") as HTMLButtonElement;
    closePreview.addEventListener<"click">("click",
        (ev) => {
            let previewDiv = document.getElementById("previewDiv") as HTMLDivElement;
            previewDiv.style.visibility = "collapse";
        });

    let previewRestore = document.getElementById("previewRestore") as HTMLButtonElement;
    previewRestore.addEventListener<"click">("click",
        (ev) => {
            browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
                if (tabs && tabs.length == 1) {
                    if (tabs[0].url.indexOf("spserver") > 0) {
                        let previewBody = document.getElementById("previewBody") as HTMLDivElement;
                        browser.tabs.sendMessage(tabs[0].id, { text: "restoreText", reviewText: previewBody.innerHTML },
                            (succeed: boolean) => {
                                if (succeed) {
                                    console.log("preview resored");
                                }
                            });
                    } else {
                        console.log(tabs[0].url);
                    }
                } else {
                    console.log("no tab");
                }
            });
        });
});
