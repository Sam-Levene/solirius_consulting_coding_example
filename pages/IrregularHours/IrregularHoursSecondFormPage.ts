import { BasePage } from "../BasePage.js";

export class IrregularHoursSecondFormPage extends BasePage {
    public get elements() {
        return {
           formPageHeading: this.page.getByTestId('current-question').getByRole('heading').first(),
           formContinueButton: this.page.getByRole('button', { name: "Continue"}),
           dayInput: this.page.getByTestId("response-0"),
           monthInput: this.page.getByTestId("response-1"),
           yearInput: this.page.getByTestId("response-2"),
           errorMessage: this.page.locator('xpath=//html/body/div[3]/div/main/div/div/form/div/div[2]/fieldset/div/p'),
        };
    }
}