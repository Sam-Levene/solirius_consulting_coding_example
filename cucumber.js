export default [
    "--import features/**/*.ts",
    "--format json:./report/cucumber-html-reporter.json",
    "--format html:./report/cucumber-html-reporter.html",
    '--format junit:./report/cucumber-report.xml',
    "--format @cucumber/pretty-formatter"
].join(" ");
