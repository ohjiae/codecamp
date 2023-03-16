import puppeteer from "puppeteer";
async function startCrawling() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    page.goto("https://www.goodchoice.kr/product/search/2");
    page.waitForTimeout(1000);
}

startCrawling();
