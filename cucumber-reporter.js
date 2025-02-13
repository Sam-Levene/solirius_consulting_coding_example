import { generate } from 'cucumber-html-reporter';

const options = {
  jsonFile: './report/cucumber-html-reporter.json',
  launchReport: true,
  noInlineScreenshots: false,
  output: './report/myreport.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  screenshotsDirectory: './report/screenshots/',
  storeScreenshots: true,
  theme: 'bootstrap',
};

generate(options);