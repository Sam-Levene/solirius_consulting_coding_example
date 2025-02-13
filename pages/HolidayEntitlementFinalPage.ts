import { BasePage } from "./BasePage.js";

export class HolidayEntitlementFinalPage extends BasePage {
    public get elements() {
        return {
           formPageHeading: this.page.getByTestId('result-info').getByRole('heading').first(),
           formCalculatedStatutoryEntitlement: this.page.locator('xpath=//*[@id="result-info"]/div[2]/div/div/div/p'),
           irregularHoursFormCalculatedStatutoryEntitlement: this.page.locator('xpath=//*[@id="result-info"]/div[2]/div/div/p[1]'),
        };
    }
}