const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const DEBUG = false;
let browser, page;

const titles = ['Scalable Vector Graphics', 'Open standard', 'Unix', 'ALGOL'];
const descriptions = [
    'Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.',
    'An open standard is a standard that is publicly available and has various rights to use associated with it and may also have various properties of how it was designed (e.g. open process). There is no single definition, and interpretations vary with usage.',
    'Unix (trademarked as UNIX) is a family of multitasking, multiuser computer operating systems that derive from the original AT&T Unix, development starting in the 1970s at the Bell Labs research center by Ken Thompson, Dennis Ritchie, and others.',
    'ALGOL (short for "Algorithmic Language") is a family of imperative computer programming languages originally developed in 1958. ALGOL heavily influenced many other languages and was the standard method for algorithm description used by the Association for Computing Machinery (ACM) in textbooks and academic sources until object-oriented languages came around, for more than thirty years.',
];

describe('tests', function () {
    this.timeout(6000);
    before(async () => {
        browser = await chromium.launch(DEBUG ? { headless: false, slowMo: 200 } : {});
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://127.0.0.1:5500/01.%20Accordion');
    });
    afterEach(async () => {
        await page.close();
    });

    it('should display all 4 titles from the server', async () => {
        const titlesOnPage = await page.locator('span').allTextContents();

        expect(titles).to.deep.equal(titlesOnPage);
    });

    it('should have descriptions when button are clicked', async () => {
        const buttons = await page.$$('text=More');

        let paragraphsText = [];

        for (const button of buttons) {
            await button.click();
        }

        const paragraphs = await page.$$('p');

        for (const p of paragraphs) {
            paragraphsText.push(await p.textContent());
        }

        expect(paragraphsText).to.deep.equal(descriptions);
    });

    it('buttons should have text Less when are clicked', async () => {
        const buttons = await page.$$('text=More');
        let buttonsText = [];

        for (const button of buttons) {
            await button.click();
            buttonsText.push(await button.textContent());
        }

        buttonsText = [...new Set(buttonsText)];

        expect(buttonsText).to.deep.equal(['Less']);
    });

    it('should not have descriptions when button are clicked twice', async () => {
        const buttons = await page.$$('text=More');
        const paragraphs = await page.$$('p');

        let visibleParagraphs = [];

        for (const button of buttons) {
            await button.click();
            await button.click();
        }

        for (const p of paragraphs) {
            visibleParagraphs.push(await p.isVisible());
        }

        visibleParagraphs = [...new Set(visibleParagraphs)];

        expect(visibleParagraphs).to.deep.equal([false]);
    });

    it('buttons should have text More when are clicked twice', async () => {
        const buttons = await page.$$('text=More');
        let buttonsText = [];

        for (const button of buttons) {
            await button.click();
            await button.click();
            buttonsText.push(await button.textContent());
        }

        buttonsText = [...new Set(buttonsText)];

        expect(buttonsText).to.deep.equal(['More']);
    });
});
