import { BasePage } from "./BasePage.js";

export class HolidayLinksPage extends BasePage {
    public get elements() {
        return {
            holidayLinksHeading: this.page.locator("h1"),
            employingPeopleHeading: this.page.locator("h2"),
        };
    }
}