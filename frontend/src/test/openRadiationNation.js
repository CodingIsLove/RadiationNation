const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8083');
    await page.screenshot({path: 'testOutput/example.png'});

    await browser.close();
})();