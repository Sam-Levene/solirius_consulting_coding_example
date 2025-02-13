import { BasePage } from "../BasePage.js";

export class EndedPartWayHolidayYearPage extends BasePage {
    public get elements() {
        return {
           formPageHeading: this.page.getByTestId('current-question').getByRole('heading').first(),
           formContinueButton: this.page.getByRole('button', { name: "Continue"}),
           dayInput: this.page.getByTestId("response-0"),
           monthInput: this.page.getByTestId("response-1"),
           yearInput: this.page.getByTestId("response-2"),
        };
    }
}