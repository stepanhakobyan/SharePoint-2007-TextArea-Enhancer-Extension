if (window.browser) {
    //do nothing
}
else if ((window as any).chrome) {
    window.browser = (window as any).chrome;
}

export default window.browser;
