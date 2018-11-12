console.log("redeclare.js")

if (window.browser) {
    //do nothing
}
else if ((window as any).chrome) {
    window.browser = (window as any).chrome;
}
const browserApi = window.browser;
export default browserApi;
