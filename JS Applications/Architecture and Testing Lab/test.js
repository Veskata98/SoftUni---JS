const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const DEBUG = true;
let browser, page, userId;

const recipesNames = ['Easy Lasagna', 'Grilled Duck Fillet', 'Roast Trout'];
const buttons = ['Catalog', 'Create Recipe', 'Logout', 'Login', 'Register'];
const details = {
    title: 'Easy Lasagna',
    ingredients: ['1 tbsp Ingredient 1', '2 cups Ingredient 2', '500 g  Ingredient 3', '25 g Ingredient 4'],
    steps: ['Prepare ingredients', 'Mix ingredients', 'Cook until done'],
};

const host = 'http://127.0.0.1:5500/02.%20My%20CookBook_Testing';

const endpoints = {
    recipes: '/data/recipes?select=_id%2Cname%2Cimg',
    count: '/data/recipes?count',
    recent: '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc',
    recipe_by_id: '/data/recipes/3987279d-0ad4-4afb-8ca9-5b256ae3b298',
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    create: '/data/recipes',
};

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
}

describe('My Cookbook testing', function () {
    this.timeout(6000);
    before(async () => {
        browser = await chromium.launch(DEBUG ? { headless: false, slowMo: 200 } : {});
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        context = await browser.newContext();

        // block intensive resources and external calls (page routes take precedence)
        await context.route('**/*.{png,jpg,jpeg}', (route) => route.abort());
        /*
        await context.route(url => {
            return url.hostname != 'localhost';
        }, route => route.abort());
		*/
        await context.route('**' + endpoints.count, (route) => route.fulfill(json(3)));

        page = await context.newPage();
        await page.goto(host);
    });
    afterEach(async () => {
        await page.close();
    });

    describe('Initial rendering tests', () => {
        it('should render content of the API', async () => {
            const titleElement = await page.$('h1 > a');
            const title = await titleElement.textContent();

            const navLinks = await page.locator('nav a');
            const recipes = await page.$$('h2');

            const recipeTitles = [];
            const navButtons = [];

            for (const recipe of recipes) {
                recipeTitles.push(await recipe.textContent());
            }

            const linksCount = await navLinks.count();

            for (let i = 0; i < linksCount; i++) {
                navButtons.push(await navLinks.nth(i).textContent());
            }

            const createRecipeLink = await navLinks.nth(1).isVisible();
            const logoutBtn = await navLinks.nth(2).isVisible();

            expect(title).to.equal('My Cookbook');
            expect(recipeTitles).to.deep.equal(recipesNames);
            expect(navButtons).to.deep.equal(buttons);
            expect(createRecipeLink).to.be.false;
            expect(logoutBtn).to.be.false;
        });

        it('should display the recipe details', async () => {
            const article = await page.locator('article:has-text("Easy Lasagna")');
            await article.click();

            const title = await article.locator('h2').textContent();
            const ingredients = await article.locator('li').allTextContents();
            const steps = await article.locator('p').allTextContents();

            const obj = { title, ingredients, steps };

            expect(obj).to.deep.equal(details);
        });
    });

    describe('login API calls tests', () => {
        it('test with no input', async () => {
            await page.click('text="Login"');
            const [response] = await Promise.all([page.waitForResponse('**'), page.click('input[type="submit"]')]);

            const requestMethod = await response.request().method();
            const responseUrl = await response.url();
            const responseStatus = await response.status();

            expect(requestMethod).to.equal('POST');
            expect(responseUrl).to.equal('http://localhost:3030/users/login');
            expect(responseStatus).to.not.equal(200);
        });

        it('test with input', async () => {
            await page.click('text="Login"');
            await page.locator('input[name="email"]').fill('peter@abv.bg');
            await page.locator('input[name="password"]').fill('123456');

            const [response] = await Promise.all([page.waitForResponse('**'), page.click('input[type="submit"]')]);

            const postData = JSON.parse(response.request().postData());

            const requestMethod = await response.request().method();
            const requestUrl = await response.request().url();
            const responseUrl = await response.url();
            const responseStatus = await response.status();

            expect(postData).to.deep.equal({ email: 'peter@abv.bg', password: '123456' });

            expect(requestMethod).to.equal('POST');
            expect(responseUrl, requestUrl).to.be.equal('http://localhost:3030/users/login');
            expect(responseStatus).to.equal(200);
        });
    });

    describe('register API calls tests', () => {
        it('test with no input', async () => {
            await page.click('text="Register"');
            const [response] = await Promise.all([page.waitForResponse('**'), page.click('input[type="submit"]')]);

            const requestMethod = await response.request().method();
            const responseUrl = await response.url();
            const responseStatus = await response.status();

            expect(requestMethod).to.equal('POST');
            expect(responseUrl).to.equal('http://localhost:3030/users/register');
            expect(responseStatus).to.not.equal(200);
        });

        it('test with input', async () => {
            await page.click('text="Register"');
            await page.locator('input[name="email"]').fill('peter@abv.bg');
            await page.locator('input[name="password"]').fill('123456');
            await page.locator('input[name="rePass"]').fill('123456');

            const [response] = await Promise.all([page.waitForResponse('**'), page.click('input[type="submit"]')]);

            const postData = JSON.parse(response.request().postData());

            const requestMethod = await response.request().method();
            const requestUrl = await response.request().url();
            const responseUrl = await response.url();
            const responseStatus = await response.status();

            expect(postData).to.deep.equal({ email: 'peter@abv.bg', password: '123456' });

            expect(requestMethod).to.equal('POST');
            expect(responseUrl, requestUrl).to.be.equal('http://localhost:3030/users/register');
            expect(responseStatus).to.oneOf([200, 409]);
        });
    });

    describe('CRUD tests', () => {
        const email = 'peter@abv.bg';
        const password = '123456';

        beforeEach(async () => {
            await page.click('text=Login');

            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);

            const [response] = await Promise.all([page.waitForResponse('**'), page.click('[type="submit"]')]);
            const user = await response.json();
            userId = user._id;
        });

        it('create functionality testing', async () => {
            const mockData = {
                name: 'Eggs',
                img: 'https://media.istockphoto.com/photos/group-of-brown-raw-eggs-one-is-broken-isolated-white-picture-id173234780?k=20&m=173234780&s=612x612&w=0&h=RGxAveqXBCNTXYvLwUuMl2QCixlrl5UC50gc7UwZ2WU=',
                ingredients: ['eggs', 'salt'],
                steps: ['peel', 'bake', 'eat'],
            };

            await page.click('text="Create Recipe"');

            await page.locator('input[name="name"]').fill('Eggs');
            await page
                .locator('input[name="img"]')
                .fill(
                    'https://media.istockphoto.com/photos/group-of-brown-raw-eggs-one-is-broken-isolated-white-picture-id173234780?k=20&m=173234780&s=612x612&w=0&h=RGxAveqXBCNTXYvLwUuMl2QCixlrl5UC50gc7UwZ2WU='
                );
            await page.locator('textarea[name="ingredients"]').fill('eggs\nsalt');
            await page.locator('textarea[name="steps"]').fill('peel\nbake\neat');

            const [response] = await Promise.all([page.waitForResponse('**'), page.click('input[type="submit"]')]);
            const postData = JSON.parse(response.request().postData());

            expect(postData).to.deep.equal(mockData);
        });

        it('user to see edit buttons if he is the creator of the recipe', async () => {
            const [response] = await Promise.all([page.waitForResponse('**'), page.click('text="Easy Lasagna"')]);
            const createdByUser = await response.json();
            const createdByUserId = createdByUser._ownerId;

            const editIsVisible = await page.isVisible('text=Edit');
            const deleteIsVisible = await page.isVisible('text=Delete');

            expect(createdByUserId).to.be.equal(userId);
            expect(editIsVisible).to.be.true;
            expect(deleteIsVisible).to.be.true;
        });

        it('should display correct data in edit form', async () => {
            await page.click('text=Easy Lasagna');
            await page.click('text=Edit');

            const title = await page.locator('input[name="name"]').inputValue();

            let ingredients = await page.locator('textarea[name="ingredients"]').inputValue();
            ingredients = ingredients.split('\n');

            let steps = await page.locator('textarea[name="steps"]').inputValue();
            steps = steps.split('\n');

            expect(details.title).to.equal(title);
            expect(details.ingredients).to.deep.equal(ingredients);
            expect(details.steps).to.deep.equal(steps);
        });

        it('should make correct API call for edit', async () => {
            await page.click('text=Easy Lasagna');
            await page.click('text=Edit');

            await page.locator('input[name="name"]').fill('Eggs');

            const [response] = await Promise.all([page.waitForResponse('**'), page.click('input[type=Submit]')]);
            const postData = JSON.parse(response.request().postData());

            expect(postData.name).to.equal('Eggs');
        });
        it.only('should make correct API call for delete', async () => {
            await page.click('text=Easy Lasagna');
            await page.locator('button[text=Delete]').click();

            page.on('dialog', (dialog) => dialog.accept());
            await page.locator('button').click();

            const [response] = await Promise.all([page.waitForResponse('**')]);
            const postData = JSON.parse(response.request().postData());

            expect(postData.name).to.equal('Easy Lasagna');
        });
    });
});
