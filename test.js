const puppeteer = require("puppeteer");
const io = require("puppeteer-io");
const connect = require("connect");
const static = require("serve-static");
const http = require("http");

const { ok } = require("assert");
const { join } = require("path");

describe("It...", () => {
    let server;
    let browser;

    beforeEach(async () => {
        const app = connect();
        const root = join(__dirname, "test-app");

        app.use(static(root));

        server = http.createServer(app).listen(3000);

        browser = await puppeteer.launch();
    });

    afterEach(async () => {
        await browser.close();

        server.close();
    });

    it("should test SubscribableComponent, SubscribableDirective and SubscribableService", async () => {
        const page = await browser.newPage();

        await io({
            page,
            async input() {
                await page.goto("http://localhost:3000/");

                await page.click("button");
                await page.click("button");
            },
            async output({ message }) {
                await message("unsubscribe: service");
                await message("unsubscribe: component");
                await message("unsubscribe: directive");

                ok(true);
            },
        });

        await page.close();
    });
});
