if (window.browser) {
    //do nothing
}
else if (window.chrome) {
    window.browser = window.chrome;
}
export default window.browser;
//# sourceMappingURL=redeclare.js.map