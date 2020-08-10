const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto(`https://www.dofus-touch.com/en/mmorpg/encyclopedia/monsters?size=96&page=1`);
  await page.screenshot({ path: 'data/root.png' });

  await browser.close();
})();
