import { BasePage } from "../BasePage.js";

export class RegularHoursFourthFormPage extends BasePage {
    public get elements() {
        return {
           formPageHeading: this.page.getByTestId('current-question').getByRole('heading').first(),
           daysPerWeekWorkedInput: this.page.getByTestId('response'),
           formContinueButton: this.page.getByRole('button', { name: "Continue"}),
           errorMessage: this.page.locator('xpath=//html/body/div[3]/div/main/div/div/form/div/div[2]/p'),
        };
    }
}