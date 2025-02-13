import { BasePage } from "./BasePage.js";

export class HolidayEntitlementStartPage extends BasePage {
    public get elements() {
        return {
            holidayEntitlementStartPageHeading: this.page.getByRole("heading", { name: "Calculate holiday entitlement" }),
            startNowButton: this.page.locator('a', { hasText: "Start now" }),
            anchorTag: this.page.locator('a'),
        };
    }
}