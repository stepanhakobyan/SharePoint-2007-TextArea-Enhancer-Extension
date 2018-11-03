var HALF_MINUTE = 30 * 1000;
setInterval(function (args) {
    browser.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (tabs && tabs.length == 1) {
            if (tabs[0].url.indexOf("spserver") > 0) {
                browser.tabs.sendMessage(tabs[0].id, { text: 'getReviewDetails' }, function (reviewText) {
                    var prevText = window.localStorage.getItem("previousReviewText1");
                    if (prevText == reviewText) {
                        //no change detected
                        return;
                    }
                    console.log(reviewText);
                    for (var i = 4; i > 0; i--) {
                        var prevText_1 = window.localStorage.getItem("previousReviewText" + i);
                        var prevTime = window.localStorage.getItem("previousReviewTime" + i);
                        if (prevText_1) {
                            window.localStorage.setItem("previousReviewText" + (i + 1), prevText_1);
                            window.localStorage.setItem("previousReviewTime" + (i + 1), prevTime);
                        }
                    }
                    var now = new Date();
                    window.localStorage.setItem("previousReviewText1", reviewText);
                    window.localStorage.setItem("previousReviewTime1", now.toLocaleString("en-GB"));
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
}, HALF_MINUTE);
//var prob = 1;
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //console.log("tabId - changeInfo - tab 1");
    //console.log(tabId);
    //console.log(changeInfo);
    //console.log(tab);
    if (changeInfo.status === "complete") {
        if (startsWith(tab.url, "http://spserver/Lists/")) {
            console.log("tabId - changeInfo - tab");
            console.log(tabId);
            console.log(changeInfo);
            console.log(tab);
            //if (prob < 5) {
            //    browser.tabs.sendMessage(tabId, { text: 'checkSharePoint' },
            //        (result: boolean) => {
            //            console.log(result);
            //            if (!result) {
            //                browser.tabs.executeScript(null, {
            //                    file: "js/nicEdit-latest.js"
            //                });
            //                browser.tabs.executeScript(null, {
            //                    file: "js/nicEditInit.js"
            //                });
            //                //prob++;
            //                //browser.tabs.sendMessage(tabId, { text: 'checkSharePoint' },
            //                //    (result: boolean) => {
            //                //        console.log(result);
            //                //    });
            //            }
            //            prob++;
            //        });
            //}
            browser.tabs.executeScript(null, {
                file: "js/nicEdit-latest.js"
            });
            browser.tabs.executeScript(null, {
                file: "js/content.js"
            });
        }
    }
});
function startsWith(source, start) {
    return source.lastIndexOf(start, 0) === 0;
}
//# sourceMappingURL=background.js.map