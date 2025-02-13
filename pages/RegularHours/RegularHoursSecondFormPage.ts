import { BasePage } from "../BasePage.js";

export class RegularHoursSecondFormPage extends BasePage {
    public get elements() {
        return {
           formPageHeading: this.page.getByTestId('current-question').getByRole('heading').first(),
           formContinueButton: this.page.getByRole('button', { name: "Continue"}),
           entitlementByDaysPerWeek: this.page.getByRole('radio').nth(0),
           entitlementByHoursPerWeek: this.page.getByRole('radio').nth(1),
           entitlementByAnnualisedHours: this.page.getByRole('radio').nth(2),
           entitlementByCompressedHours: this.page.getByRole('radio').nth(3),
           entitlementByShifts: this.page.getByRole('radio').nth(4),
           errorMessage: this.page.locator('xpath=//html/body/div[3]/div/main/div/div/form/div/div[2]/fieldset/p'),
        };
    }
}