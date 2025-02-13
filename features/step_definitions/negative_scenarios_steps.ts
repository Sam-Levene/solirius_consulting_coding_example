import { When, Then } from "@cucumber/cucumber";
import { HolidayEntitlementStartPage } from "../../pages/HolidayEntitlementStartPage.js";
import { HolidayEntitlementFirstFormPage } from "../../pages/HolidayEntitlementForm/HolidayEntitlementFirstFormPage.js";
import { IrregularHoursSecondFormPage } from "../../pages/IrregularHours/IrregularHoursSecondFormPage.js";
import { IrregularHoursThirdFormPage } from "../../pages/IrregularHours/IrregularHoursThirdFormPage.js";
import { expect } from "@playwright/test";
import ICustomWorld from "../../support/custom-world.js";
import { RegularHoursSecondFormPage } from "../../pages/RegularHours/RegularHoursSecondFormPage.js";
import { RegularHoursFourthFormPage } from "../../pages/RegularHours/RegularHoursFourthFormPage.js";
import { RegularHoursThirdFormPage } from "../../pages/RegularHours/RegularHoursThirdFormPage.js";

When('the user navigates to the website and starts the irregular hours form but leaves the {string} field blank', async function (this: ICustomWorld, fieldType: string) {
    const holidayEntitlementStartPage = new HolidayEntitlementStartPage(this.page, this.context);
        const holidayEntitlementFirstFormPage = new HolidayEntitlementFirstFormPage(this.page, this.context);
        const irregularHoursSecondFormPage = new IrregularHoursSecondFormPage(this.page, this.context);
        const irregularHoursThirdFormPage = new IrregularHoursThirdFormPage(this.page, this.context);
    
        await this.allPagesObject.basePage.goTo("https://www.gov.uk/calculate-your-holiday-entitlement");
        await holidayEntitlementStartPage.elements.startNowButton.click();
    
        await holidayEntitlementFirstFormPage.pageLoaded();
        await holidayEntitlementFirstFormPage.elements.irregularHoursYesRadial.check();
        await holidayEntitlementFirstFormPage.elements.formContinueButton.click();
    
        await irregularHoursSecondFormPage.pageLoaded();
    if (fieldType == "Leave End Year") {
        await irregularHoursSecondFormPage.elements.formContinueButton.click();
    } else {
        await irregularHoursSecondFormPage.elements.dayInput.fill("1");
        await irregularHoursSecondFormPage.elements.monthInput.fill("2");
        await irregularHoursSecondFormPage.elements.yearInput.fill("2025");
        await irregularHoursSecondFormPage.elements.formContinueButton.click();
    
        await irregularHoursThirdFormPage.pageLoaded();
        await irregularHoursThirdFormPage.elements.formContinueButton.click();
    }
});

When('the user navigates to the website and starts the regular hours form but leaves the {string} field blank', async function (this: ICustomWorld, fieldType: string) {
    const holidayEntitlementStartPage = new HolidayEntitlementStartPage(this.page, this.context);
    const holidayEntitlementFirstFormPage = new HolidayEntitlementFirstFormPage(this.page, this.context);
    const regularHoursSecondFormPage = new RegularHoursSecondFormPage(this.page, this.context);
    const regularHoursThirdFormPage = new RegularHoursThirdFormPage(this.page, this.context);
    const regularHoursFourthFormPage = new RegularHoursFourthFormPage(this.page, this.context);

    await this.allPagesObject.basePage.goTo("https://www.gov.uk/calculate-your-holiday-entitlement");
    await holidayEntitlementStartPage.elements.startNowButton.isVisible();
    await holidayEntitlementStartPage.elements.startNowButton.click();

    await holidayEntitlementFirstFormPage.pageLoaded();
    await holidayEntitlementFirstFormPage.elements.irregularHoursNoRadial.check();
    await holidayEntitlementFirstFormPage.elements.formContinueButton.click();

    await regularHoursSecondFormPage.pageLoaded();
    if (fieldType == "Days Per Week Radio Button") {
        await regularHoursSecondFormPage.elements.formContinueButton.click();
    }
    else {
        await regularHoursSecondFormPage.elements.entitlementByDaysPerWeek.check();
        await regularHoursSecondFormPage.elements.formContinueButton.click();

        await regularHoursThirdFormPage.pageLoaded();
        if (fieldType == "Full Year Entitlement Radio Button") {
            await regularHoursThirdFormPage.elements.formContinueButton.click();
        } else {
            await regularHoursThirdFormPage.elements.startingDateFullYear.check();
            await regularHoursThirdFormPage.elements.formContinueButton.click();

            await regularHoursFourthFormPage.pageLoaded();
            await regularHoursThirdFormPage.elements.formContinueButton.click();
        }
    }
});

Then('the relevant {string} message is shown', function (fieldType: string) {
    const irregularHoursSecondFormPage = new IrregularHoursSecondFormPage(this.page, this.context);
    const irregularHoursThirdFormPage = new IrregularHoursThirdFormPage(this.page, this.context);
    const regularHoursSecondFormPage = new RegularHoursSecondFormPage(this.page, this.context);
    const regularHoursThirdFormPage = new RegularHoursThirdFormPage(this.page, this.context);
    const regularHoursFourthFormPage = new RegularHoursFourthFormPage(this.page, this.context);
    
    if (fieldType == "Leave End Year") {
        expect(irregularHoursSecondFormPage.elements.errorMessage).toHaveText("Error: Please answer this question");
    } else if (fieldType == "Days Per Week Radio Button") {
        expect(regularHoursSecondFormPage.elements.errorMessage).toHaveText("Error: Please answer this question");
    } else if (fieldType == "Full Year Entitlement Radio Button") {
        expect(regularHoursThirdFormPage.elements.errorMessage).toHaveText("Error: Please answer this question");
    } else if (fieldType == "Days Worked Per Week Field") {
        expect(regularHoursFourthFormPage.elements.errorMessage).toHaveText("Error: There are only 7 days in a week. Please check and enter a correct value.");
    } else {
        expect(irregularHoursThirdFormPage.elements.errorMessage).toHaveText("Error: Please answer this question");
    }
});