import { Given, When, Then } from "@cucumber/cucumber";
import ICustomWorld from "../../support/custom-world.js";
import { HolidayEntitlementStartPage } from "../../pages/HolidayEntitlementStartPage.js";
import { HolidayEntitlementFirstFormPage } from "../../pages/HolidayEntitlementForm/HolidayEntitlementFirstFormPage.js";
import { IrregularHoursSecondFormPage } from "../../pages/IrregularHours/IrregularHoursSecondFormPage.js";
import { IrregularHoursThirdFormPage } from "../../pages/IrregularHours/IrregularHoursThirdFormPage.js";
import { RegularHoursSecondFormPage } from "../../pages/RegularHours/RegularHoursSecondFormPage.js";
import { RegularHoursThirdFormPage } from "../../pages/RegularHours/RegularHoursThirdFormPage.js";
import { RegularHoursFourthFormPage }  from "../../pages/RegularHours/RegularHoursFourthFormPage.js";
import { EndedPartWayDateEndedPage } from "../../pages/EndedPartWay/EndedPartWayDateEndedPage.js";
import { EndedPartWayHolidayYearPage } from "../../pages/EndedPartWay/EndedPartWayHolidayYearPage.js";
import { HolidayEntitlementFinalPage } from "../../pages/HolidayEntitlementFinalPage.js";
import { HolidayLinksPage } from "../../pages/HolidayLinksPage.js";
import { expect } from "@playwright/test";

Given('a user is on their browser', async function (this: ICustomWorld) {
   await this.allPagesObject.basePage.pageLoaded();
});

When('the user navigates to the website', async function (this: ICustomWorld) {
    await this.allPagesObject.basePage.goTo("https://www.gov.uk/calculate-your-holiday-entitlement");
});

Then('the website is displayed', async function (this: ICustomWorld) {
    const holidayEntitlementStartPage = new HolidayEntitlementStartPage(this.page, this.context);
    expect(holidayEntitlementStartPage.elements.holidayEntitlementStartPageHeading).toHaveText("Calculate holiday entitlement");
});

When('the user navigates to the website and clicks the start button', async function (this: ICustomWorld) {
    const holidayEntitlementStartPage = new HolidayEntitlementStartPage(this.page, this.context);
    await this.allPagesObject.basePage.goTo("https://www.gov.uk/calculate-your-holiday-entitlement");
    await holidayEntitlementStartPage.elements.startNowButton.click();
});

Then('the process has begun', async function (this: ICustomWorld) {
    const holidayEntitlementFirstFormPage = new HolidayEntitlementFirstFormPage(this.page, this.context);
    await holidayEntitlementFirstFormPage.pageLoaded();
    expect(holidayEntitlementFirstFormPage.elements.formPageHeading).toHaveText("Does the employee work irregular hours or for part of the year?");
});

When('the user navigates to the website and completes the form with irregular hours', async function (this: ICustomWorld) {
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
    await irregularHoursSecondFormPage.elements.dayInput.fill("1");
    await irregularHoursSecondFormPage.elements.monthInput.fill("2");
    await irregularHoursSecondFormPage.elements.yearInput.fill("2025");
    await irregularHoursSecondFormPage.elements.formContinueButton.click();

    await irregularHoursThirdFormPage.pageLoaded();
    await irregularHoursThirdFormPage.elements.hoursWorkedInput.fill("55");
    await irregularHoursThirdFormPage.elements.formContinueButton.click();
});

Then('the user\'s irregular hours entitlement is calculated', async function (this: ICustomWorld) {
    const holidayEntitlementFinalPage = new HolidayEntitlementFinalPage(this.page, this.context);
    await holidayEntitlementFinalPage.pageLoaded();
    const headingText = await holidayEntitlementFinalPage.elements.formPageHeading.evaluate((element) => {
        if (!element) return ''; // Return empty string if null

        return Array.from(element.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE) // Keep only text nodes
            .map(node => node.textContent?.trim() || '') // Extract text content safely
            .join(''); // Join into a single string
    });
    expect(headingText).toBe("Information based on your answers");
    const entitlementAmount = await holidayEntitlementFinalPage.elements.irregularHoursFormCalculatedStatutoryEntitlement.textContent();
    expect(entitlementAmount).toBe("The statutory entitlement for this pay period is 7 hours.");
});

When('the user navigates to the website and completes the form with regular hours for a full year', async function (this: ICustomWorld) {
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
    await regularHoursSecondFormPage.elements.entitlementByDaysPerWeek.check();
    await regularHoursSecondFormPage.elements.formContinueButton.click();

    await regularHoursThirdFormPage.pageLoaded();
    await regularHoursThirdFormPage.elements.startingDateFullYear.check();
    await regularHoursThirdFormPage.elements.formContinueButton.click();

    await regularHoursFourthFormPage.pageLoaded();
    await regularHoursFourthFormPage.elements.daysPerWeekWorkedInput.fill("5");
    await regularHoursThirdFormPage.elements.formContinueButton.click();
});

Then('the user\'s full year entitlement is calculated', async function (this: ICustomWorld) {
    const holidayEntitlementFinalPage = new HolidayEntitlementFinalPage(this.page, this.context);
    await holidayEntitlementFinalPage.pageLoaded();
    const headingText = await holidayEntitlementFinalPage.elements.formPageHeading.evaluate((element) => {
        if (!element) return ''; // Return empty string if null

        return Array.from(element.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE) // Keep only text nodes
            .map(node => node.textContent?.trim() || '') // Extract text content safely
            .join(''); // Join into a single string
    });
    expect(headingText).toBe("Information based on your answers");
    const entitlementAmount = await holidayEntitlementFinalPage.elements.formCalculatedStatutoryEntitlement.textContent();
    expect(entitlementAmount).toBe("The statutory holiday entitlement is 28 days holiday.");
});

When('the user navigates to the website and completes the form with regular hours for part of a year', async function (this: ICustomWorld) {
    const holidayEntitlementStartPage = new HolidayEntitlementStartPage(this.page, this.context);
    const holidayEntitlementFirstFormPage = new HolidayEntitlementFirstFormPage(this.page, this.context);
    const regularHoursSecondFormPage = new RegularHoursSecondFormPage(this.page, this.context);
    const regularHoursThirdFormPage = new RegularHoursThirdFormPage(this.page, this.context);
    const endedPartWayDateEndedPage = new EndedPartWayDateEndedPage(this.page, this.context);
    const endedPartWayHolidayYearPage = new EndedPartWayHolidayYearPage(this.page, this.context);
    const regularHoursFourthFormPage = new RegularHoursFourthFormPage(this.page, this.context);

    await this.allPagesObject.basePage.goTo("https://www.gov.uk/calculate-your-holiday-entitlement");
    await holidayEntitlementStartPage.elements.startNowButton.isVisible();
    await holidayEntitlementStartPage.elements.startNowButton.click();

    await holidayEntitlementFirstFormPage.pageLoaded();
    await holidayEntitlementFirstFormPage.elements.irregularHoursNoRadial.check();
    await holidayEntitlementFirstFormPage.elements.formContinueButton.click();

    await regularHoursSecondFormPage.pageLoaded();
    await regularHoursSecondFormPage.elements.entitlementByDaysPerWeek.check();
    await regularHoursSecondFormPage.elements.formContinueButton.click();

    await regularHoursThirdFormPage.pageLoaded();
    await regularHoursThirdFormPage.elements.startingDateEndPartWay.check();
    await regularHoursThirdFormPage.elements.formContinueButton.click();

    await endedPartWayDateEndedPage.pageLoaded();
    await endedPartWayDateEndedPage.elements.dayInput.fill("12");
    await endedPartWayDateEndedPage.elements.monthInput.fill("2");
    await endedPartWayDateEndedPage.elements.yearInput.fill("2025");
    await endedPartWayDateEndedPage.elements.formContinueButton.click();

    await endedPartWayHolidayYearPage.pageLoaded();
    await endedPartWayHolidayYearPage.elements.dayInput.fill("1");
    await endedPartWayHolidayYearPage.elements.monthInput.fill("4");
    await endedPartWayHolidayYearPage.elements.yearInput.fill("2024");
    await endedPartWayHolidayYearPage.elements.formContinueButton.click();

    await regularHoursFourthFormPage.pageLoaded();
    await regularHoursFourthFormPage.elements.daysPerWeekWorkedInput.fill("5");
    await regularHoursThirdFormPage.elements.formContinueButton.click();
});

Then('the user\'s part year entitlement is calculated', async function (this: ICustomWorld) {
    const holidayEntitlementFinalPage = new HolidayEntitlementFinalPage(this.page, this.context);
    await holidayEntitlementFinalPage.pageLoaded();
    const headingText = await holidayEntitlementFinalPage.elements.formPageHeading.evaluate((element) => {
        if (!element) return ''; // Return empty string if null

        return Array.from(element.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE) // Keep only text nodes
            .map(node => node.textContent?.trim() || '') // Extract text content safely
            .join(''); // Join into a single string
    });
    expect(headingText).toBe("Information based on your answers");
    const entitlementAmount = await holidayEntitlementFinalPage.elements.formCalculatedStatutoryEntitlement.textContent();
    expect(entitlementAmount).toBe("The statutory holiday entitlement is 24.4 days holiday.");
});

When('the user clicks on the link {string}', async function (this: ICustomWorld, linkType: string) {
    const holidayEntitlementStartPage = new HolidayEntitlementStartPage(this.page, this.context);
    if (linkType == "Holiday entitlement" || linkType == "Employing people") {
        await holidayEntitlementStartPage.elements.anchorTag.getByText(linkType).nth(1).isVisible();
        await holidayEntitlementStartPage.elements.anchorTag.getByText(linkType).nth(1).click();
   } else {
        await holidayEntitlementStartPage.elements.anchorTag.getByText(linkType).first().isVisible();
        await holidayEntitlementStartPage.elements.anchorTag.getByText(linkType).first().click();
    }
});

Then('the {string} website is displayed', async function (this: ICustomWorld, linkType: string) {
    const holidayLinksPage = new HolidayLinksPage(this.page, this.context);
    await holidayLinksPage.pageLoaded();
    if (linkType == "Home") {
        expect(holidayLinksPage.elements.holidayLinksHeading.first()).toHaveText("GOV.UK - The best place to find government services and information");
    } else if (linkType == "Employing people") {
        expect(holidayLinksPage.elements.employingPeopleHeading.nth(2)).toHaveText(linkType);
    } else {
        expect(holidayLinksPage.elements.holidayLinksHeading.first()).toHaveText(linkType);
    }
});