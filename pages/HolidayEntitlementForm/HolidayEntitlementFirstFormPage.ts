import { BasePage } from "../BasePage.js";

export class HolidayEntitlementFirstFormPage extends BasePage {
    public get elements() {
        return {
           formPageHeading: this.page.getByTestId('current-question').getByRole('heading').first(),
           irregularHoursYesRadial: this.page.getByRole('radio').nth(0),
           irregularHoursNoRadial: this.page.getByRole('radio').nth(1),
           formContinueButton: this.page.getByRole('button', { name: "Continue"}),
        };
    }
}