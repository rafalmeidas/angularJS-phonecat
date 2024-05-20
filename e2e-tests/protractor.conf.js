//jshint strict: false
exports.config = {
    allScriptsTimeout: 60000,
    specs: ["*.js"],
    capabilities: {
        browserName: "firefox",
    },
    baseUrl: "http://localhost:8000/",
    framework: "jasmine",
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000,
    },
    onPrepare: function () {
        browser.ignoreSynchronization = true;
    },
};
