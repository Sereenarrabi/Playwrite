import { Page } from "@playwright/test";
import { BasePage } from "../Base_page";


export class BaseComponent extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}