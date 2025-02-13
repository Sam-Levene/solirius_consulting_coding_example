import { BrowserContext, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class AllPagesObject {
  basePage: BasePage;

  constructor(public page: Page, public context: BrowserContext) {
    this.basePage = new BasePage(page, context);
  }
}
