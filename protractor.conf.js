'use strict';

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    'tests/e2e/**/*.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:8000/',
  framework: 'jasmine',
  onPrepare: function () {
    browser.driver.manage().window().maximize();
    var jasmineReporters = require('jasmine-reporters');
    return browser.getProcessedConfig().then(function (config) {
      var browserName = config.capabilities.browserName;
      var junitReporter = new jasmineReporters.JUnitXmlReporter({
        consolidateAll: false,
        savePath: 'protractor-test-results/' + browserName,
        filePrefix: 'testoutput',
        modifySuiteName: function (generatedSuiteName, suite) {
          return browserName + '.' + generatedSuiteName;
        }
      });
      var myReporter = {
        jasmineStarted: function(suite) {
          console.log("Running " + suite.totalSpecsDefined + " specs\n");
        },
        suiteStarted: function(suite) {
          console.log("Suite: " + suite.description + "\n");
        },
        specStarted: function(spec) {
          console.log("spec start " + spec.description + "\n");
        },
      };
      jasmine.getEnv().addReporter(myReporter);
      jasmine.getEnv().addReporter(junitReporter);
    });
  },
  Jasminenodeopts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  }
};
