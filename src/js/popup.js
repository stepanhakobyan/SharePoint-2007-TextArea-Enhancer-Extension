window.addEventListener("load", function (_ev) {
    var save = document.getElementById("save0");
    save.addEventListener("click", function (_ev) {
        browser.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if (tabs && tabs.length == 1) {
                if (tabs[0].url.indexOf("spserver") > 0) {
                    browser.tabs.sendMessage(tabs[0].id, { text: 'getReviewDetails' }, function (reviewText) {
                        console.log(reviewText);
                        var now = new Date();
                        window.localStorage.setItem("previousReviewText0", reviewText);
                        window.localStorage.setItem("previousReviewTime0", now.toLocaleString("en-GB"));
                        var textArea = document.getElementById("d0");
                        var timeSpan = document.getElementById("t0");
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
    var _loop_1 = function (i) {
        var reviewText = window.localStorage.getItem("previousReviewText" + i);
        var time = window.localStorage.getItem("previousReviewTime" + i);
        if (reviewText) {
            var textArea = document.getElementById("d" + i);
            var timeSpan = document.getElementById("t" + i);
            textArea.textContent = reviewText;
            timeSpan.textContent = time;
        }
        var copy = document.getElementById("copyToClipboard" + i);
        copy.addEventListener("click", function (ev) {
            var textArea = document.getElementById("d" + i);
            textArea.select();
            document.execCommand('copy');
        });
        var restore = document.getElementById("restoreText" + i);
        restore.addEventListener("click", function (ev) {
            browser.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                if (tabs && tabs.length == 1) {
                    if (tabs[0].url.indexOf("spserver") > 0) {
                        var textArea = document.getElementById("d" + i);
                        browser.tabs.sendMessage(tabs[0].id, { text: "restoreText", reviewText: textArea.textContent }, function (succeed) {
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
        var preview = document.getElementById("preview" + i);
        preview.addEventListener("click", function (ev) {
            var textArea = document.getElementById("d" + i);
            var previewBody = document.getElementById("previewBody");
            previewBody.innerHTML = textArea.textContent;
            var previewDiv = document.getElementById("previewDiv");
            previewDiv.style.visibility = "visible";
        });
    };
    for (var i = 0; i <= 5; i++) {
        _loop_1(i);
    }
    var clearAll = document.getElementById("clearAll");
    clearAll.addEventListener("click", function (ev) {
        for (var i = 1; i <= 5; i++) {
            window.localStorage.removeItem("previousReviewText" + i);
            window.localStorage.removeItem("previousReviewTime" + i);
            var textArea = document.getElementById("d" + i);
            textArea.textContent = "";
            var timeSpan = document.getElementById("t" + i);
            timeSpan.textContent = "լրացված չէ";
        }
    });
    var closePreview = document.getElementById("closePreview");
    closePreview.addEventListener("click", function (ev) {
        var previewDiv = document.getElementById("previewDiv");
        previewDiv.style.visibility = "collapse";
    });
    var previewRestore = document.getElementById("previewRestore");
    previewRestore.addEventListener("click", function (ev) {
        browser.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if (tabs && tabs.length == 1) {
                if (tabs[0].url.indexOf("spserver") > 0) {
                    var previewBody = document.getElementById("previewBody");
                    browser.tabs.sendMessage(tabs[0].id, { text: "restoreText", reviewText: previewBody.innerHTML }, function (succeed) {
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