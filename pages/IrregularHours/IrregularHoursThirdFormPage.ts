import { BasePage } from "../BasePage.js";

export class IrregularHoursThirdFormPage extends BasePage {
    public get elements() {
        return {
           formPageHeading: this.page.getByTestId('current-question').getByRole('heading').first(),
           formContinueButton: this.page.getByRole('button', { name: "Continue"}),
           hoursWorkedInput: this.page.getByTestId('response'),
           errorMessage: this.page.locator('xpath=//html/body/div[3]/div/main/div/div/form/div/div[2]/p'),
        };
    }
}