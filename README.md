# Solirius Consulting Coding Example

## Description  
This repository contains my answer to the technical task for Solirius Consulting.

## Installation Instructions  

1. **Clone this repository**  
   ```sh
   git clone https://github.com/Sam-Levene/solirius_consulting_coding_example.git
   ```
2. **Navigate to the project folder**  
   ```sh
   cd solirius_consulting_coding_example
   ```
3. **Install dependencies using Node Package Manager (NPM)**  
   - **Windows users:** Install using `fnm`
   ```pwsh
    fnm env --use-on-cd | Out-String | Invoke-expression
    fnm use 22
    npm install
    npx playwright install
   ```
   - **Mac users:** Install using `brew`  
   ```sh
   /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   brew install node
   npm install
   npx playwright install
   ```
   - **Linux users:** Install using `nvm`
   (Note: Please note that you need to restart your terminal for nvm to become active.)
   ```sh
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
   nvm install node
   npm install
   npx playwright install
   ```

## Usage
***NOTE: Some systems may vary in how the script is setup in the `package.json` file; I am using a Windows machine to try this out on; but I know that using the escaped quotes aren't neccesary in Mac machines. If you are having issues, check the script quotations***

### Run all scenarios
1. Navigate to the project root (`cd solirius_consulting_coding_example`) and execute:
 ```npm run automate```
This runs tests in browser mode, for headless, set `headless: true` in features/step_definitions/common-hooks.ts and rerun the command.

### Run a single scenario
1. Find a scenario to test locally and add the `@Test` tag against it

e.g.
``` 
   @JIRA-123 @Test
    Scenario: [SCENARIO-NAME]
        Given ...
        When ...
        Then ...
```
2. Navigate to the project root (`cd solirius_consulting_coding_example`) and execute:
 ```npm run test```
 This runs tests in browser mode, for headless, set `headless: true` in features/step_definitions/common-hooks.ts and rerun the command.

## Dependencies

This project requires a few node packages that are installed when you run the command `npm install`; if this fails, then a package didn't get installed correctly. Try deleting the `node_packages` folder and retrying the command.

## Contributing

Contributions via pull requests are welcome. For substantial changes, please open an issue to discuss before proceeding. Ensure that the tests are updated as necessary.

## License

[MIT](https://choosealicense.com/licenses/mit/)

##  Accessibility Issues / Bugs with sample Web Page

For Part 2; I am using the sample website on the given GitHub link: https://github.com/Solirius-QE/QE-UI-Technical-Task; when downloading the repository and running the command within; I then ran the page through Google Lighthouse to analyse the page's performance, accessibility and SEO related issues and noticed the following:
- Does not have a `<meta name="viewport">` tag with width or initial-scaleNo `<meta name="viewport">` tag found
- Image elements do not have explicit width and height
- Images were larger than their displayed size
- Image elements do not have `[alt]` attributes
- Document doesn't have a `<title>` element
- `<html>` element does not have a `[lang]` attribute
- Does not have a `<meta name="viewport">` tag with width or initial-scaleNo `<meta name="viewport">` tag found
- Page lacks the HTML doctype, thus triggering quirks-modeDocument must contain a doctype
- Document does not have a meta description

### Bug Report for one of the Accessibility issues:

#### 1. Title  
Image elements do not have `[alt]` attributes

#### 2. Environment  
- **Device:** PC
- **Operating System:** Windows 11
- **Browser & Version:** Chrome 133.0.6943.99 
- **Assistive Technology Used:** Google Lighthouse / NVDA

#### 3. Steps to Reproduce  
- Go to the sample webpage
- Try and use NVDA as if you were a blind user to navigate the website
- Try and hover over the image to fail to hear any ALT information being sounded.

#### 4. Expected Behavior  
- EXPECTED: image should have an `[alt]` attribute so that the NVDA reader can read out the alt information

#### 5. Actual Behavior  
- ACTUAL: image did not have an `[alt]` attribute so that the NVDA reader was not able to read out the alt information

#### 6. Impact on Users  
Blind users will not be able to navigate the sample site effectively; not knowing what they are clicking on.

#### 7. Suggested Fix (if known)  
Add an `[alt]` attribute to the image so that blind users using screen readers are able to know what they are clicking on. 