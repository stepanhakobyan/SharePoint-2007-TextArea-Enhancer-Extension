console.log("redeclare.js");
if (window.browser) {
    //do nothing
}
else if (window.chrome) {
    window.browser = window.chrome;
}
const browserApi = window.browser;
export default browserApi;
//# sourceMappingURL=redeclare.js.map