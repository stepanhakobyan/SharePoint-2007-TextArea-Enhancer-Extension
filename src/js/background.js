const HALF_MINUTE = 30 * 1000;
setInterval((args) => {
    browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        if (tabs && tabs.length == 1) {
            if (tabs[0].url.indexOf("spserver") > 0) {
                browser.tabs.sendMessage(tabs[0].id, { text: 'getReviewDetails' }, (reviewText) => {
                    let prevText = window.localStorage.getItem("previousReviewText1");
                    if (prevText == reviewText) {
                        //no change detected
                        return;
                    }
                    console.log(reviewText);
                    for (let i = 4; i > 0; i--) {
                        let prevText = window.localStorage.getItem(`previousReviewText${i}`);
                        let prevTime = window.localStorage.getItem(`previousReviewTime${i}`);
                        if (prevText) {
                            window.localStorage.setItem(`previousReviewText${i + 1}`, prevText);
                            window.localStorage.setItem(`previousReviewTime${i + 1}`, prevTime);
                        }
                    }
                    let now = new Date();
                    window.localStorage.setItem(`previousReviewText1`, reviewText);
                    window.localStorage.setItem(`previousReviewTime1`, now.toLocaleString("en-GB"));
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
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
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
            browser.tabs.insertCSS({
                file: "css/light.css"
            }, () => {
                console.log("inserted light.css");
                browser.tabs.executeScript({
                    file: "js/nicEdit-latest.js",
                }, (res1) => {
                    console.log("inserted nicEdit-latest.js");
                    console.log(res1);
                    browser.tabs.executeScript({
                        file: "js/redeclare.js"
                    }, (res2) => {
                        console.log("inserted contentRedeclare.js");
                        console.log(res2);
                        browser.tabs.executeScript({
                            file: "js/content.js"
                        }, (res3) => {
                            console.log("inserted content.js");
                            console.log(res3);
                        });
                    });
                });
            });
        }
    }
});
function startsWith(source, start) {
    return source.lastIndexOf(start, 0) === 0;
}
//# sourceMappingURL=background.js.map