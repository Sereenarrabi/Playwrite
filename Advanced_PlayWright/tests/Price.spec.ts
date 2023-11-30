import { test, expect, Browser, chromium } from '@playwright/test';
import { HomePage } from '../Logic/Pages/HomePage';
import { UserType } from '../Utiles/User-Type-price';
import { PricingPage } from '../Logic/Pages/PricePage';

const BASE_URL = 'https://todoist.com';

test.describe('Pricing Page Validations Suite', () => {

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

    
    // Parameterize test for monthly prices
    const pricesMonthly = [{ type: UserType.Beginner, price: 0 }, { type: UserType.Pro, price: 5 }, { type: UserType.Business, price: 8 }]
    for (const priceData of pricesMonthly) {
        test(`Go to Pricing -> Select monthly billing -> Validate that ${priceData.type} price ($) is: ${priceData.price}`, async ({ page }) => {
            const homePage = new HomePage(page);
            await homePage.goToPricing();

            const pricingPage = new PricingPage(page);
            await pricingPage.selectMonthlyBilling();

            let priceBrowser = await pricingPage.getPriceByType(priceData.type);
            console.log(priceBrowser);
            expect(priceData.price).toBe(priceBrowser);
        });
    }


});