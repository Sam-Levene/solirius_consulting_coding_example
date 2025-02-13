import "core-js";
import { Before, After, ITestCaseHookParameter, Status } from "@cucumber/cucumber";
import { ChromiumBrowser, chromium } from "@playwright/test";
import { AllPagesObject } from "../../pages/AllPagesObject.js";
import ICustomWorld from "../../support/custom-world.js";
import { ensureDir } from "fs-extra";

const tracesDir = "traces";

declare global {
  namespace NodeJS {
    interface Global {
      browser: ChromiumBrowser;
    }
  }
}

Before({ tags: "@ignore" }, async function () {
  return "skipped" as any;
});

Before({ tags: "@debug" }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  let browser = await chromium.launch({
    headless: false,
    args: [
      "--start-maximized",
      "--disable-blink-features=AutomationControlled"
    ],
  });
  let context = await browser.newContext({viewport: { width: 1920, height: 1024 },});
  let page = await context.newPage();
  await ensureDir(tracesDir);
  this.startTime = new Date();
  this.browser = browser;
  this.context = context;
  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = page;
  this.allPagesObject = new AllPagesObject(this.page, this.context);
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, "-");
  this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);
    const formattedTime = this.startTime?.toISOString().split(".")[0].replace(/:/g, "_");
    
    await this.context?.tracing.stop({path: `${tracesDir}/${this.testName}-${formattedTime}trace.zip`,});

    if (result.status !== Status.PASSED) {
      await this.allPagesObject.basePage.screenshot(`${this.feature?.name}`);
    }
  }

  await this.allPagesObject.page.close();
  await this.context.close();
  await this.browser.close();
});