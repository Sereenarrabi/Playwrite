import { HomePage } from "../logic/Home_page"
import { SignInPage } from "../logic/Signin_page"
import { test, expect, Browser, chromium } from '@playwright/test';


const BASE_URL = 'https://www.pokellector.com/';

test.describe('SignIn Page Validations Suite', () => {

    let browser: Browser;

    test.beforeAll(async () => {
        browser = await chromium.launch();
    });
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        await page.setViewportSize({ width: 1920, height: 1080 });
    });
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    // Parameterize test for SignIn
    const users = [
        { username: "UserNotFound", password: "1234", message: "Username not found" },
        { username: "Sereen3", password: "268", message: "Invalid Password" },
        { username: "Sereen3", password: "9279", message: "Welcome  Sereen3!" }
    ]
    for (const user of users) {
        test(`Go to SignIn -> Fill username:${user.username}  -> Fill password:${user.password}  -> Validate site message: ${user.message}`, async ({ page }) => {
            const homePage = new HomePage(page);
            await homePage.header.pressSignIn();

            const signInPage = new SignInPage(page);
            await signInPage.waitForLoad(); 
            await signInPage.signInFullProccess(user.username, user.password);

            let message = await signInPage.getSiteMessage();
            expect(message).toBe(user.message);
        });
    }


});