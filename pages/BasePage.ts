import { Page, BrowserContext, selectors, expect } from "@playwright/test";
import { join } from "path";

export class BasePage {
  page: Page;
  context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    selectors.setTestIdAttribute("id");
  }

  public get expect() {
    return expect;
  }

  async goTo(url: string) {
    await this.page.goto(url);
  }

  public screenshot(name: string): Promise<Buffer> | undefined {
    return this.page.screenshot({ path: join("screenshots", `${name}.png`) });
  }

  async pageLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async removeSessionIdCookie() {
    await this.context.clearCookies({ name: 'session_id' });
  }
}
