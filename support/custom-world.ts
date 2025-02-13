import { AllPagesObject } from "../pages/AllPagesObject.js";
import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import * as messages from "@cucumber/messages";
import { BrowserContext, Page, ChromiumBrowser } from "@playwright/test";

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface CustomWorldBeforeSetup extends World {
  debug?: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;
  homePageURL?: string; // New property set in a hook
  testName?: string;
  startTime?: Date;
  allPagesObject?: AllPagesObject;
  browser?: ChromiumBrowser;
}

export default interface ICustomWorld extends CustomWorldBeforeSetup {
  debug: boolean;
  feature: messages.Pickle;
  context: BrowserContext;
  page: Page;
  homePageURL: string; // New property set in a hook
  testName: string;
  startTime: Date;
  allPagesObject: AllPagesObject;
  browser: ChromiumBrowser;
}

export class CustomWorld extends World implements CustomWorldBeforeSetup {
  constructor(options: IWorldOptions) {
    super(options);
  }
  debug = false;
}

setWorldConstructor(CustomWorld);
