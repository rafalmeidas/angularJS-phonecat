//jshint strict: false
exports.config = {
    allScriptsTimeout: 30000,
    specs: ["*.js"],
    capabilities: {
        browserName: "firefox",
    },
    baseUrl: "http://localhost:8000/",
    framework: "jasmine",
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
    },
    onPrepare: function () {
        browser.ignoreSynchronization = true;
    },
};
