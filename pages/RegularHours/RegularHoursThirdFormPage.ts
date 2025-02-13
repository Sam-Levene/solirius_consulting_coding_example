import { BasePage } from "../BasePage.js";

export class RegularHoursThirdFormPage extends BasePage {
    public get elements() {
        return {
           formPageHeading: this.page.getByTestId('current-question').getByRole('heading').first(),
           formContinueButton: this.page.getByRole('button', { name: "Continue"}),
           startingDateFullYear: this.page.getByRole('radio').nth(0),
           startingDateStartPartWay: this.page.getByRole('radio').nth(1),
           startingDateEndPartWay: this.page.getByRole('radio').nth(2),
           startingDateStartAndEndPartWay: this.page.getByRole('radio').nth(3),
           errorMessage: this.page.locator('xpath=//html/body/div[3]/div/main/div/div/form/div/div[2]/fieldset/p'),
        };
    }
}