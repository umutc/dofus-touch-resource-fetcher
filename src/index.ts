import { launch } from "puppeteer";
import { readFileSync, writeFileSync } from "fs";

interface Item {
  name: string;
  partition?: string;
  itemId?: number;
  imageId?: number;
  itemUrl?: string;
  imageUrl?: string;
}
const cc = console;
const pages = [
  {
    ID: "monsters",
    url: "https://www.dofus-touch.com/en/mmorpg/encyclopedia/monsters?size=96",
  },
  {
    ID: "weapons",
    url: "https://www.dofus-touch.com/en/mmorpg/encyclopedia/weapons?size=96",
  },
  {
    ID: "equipment",
    url: "https://www.dofus-touch.com/en/mmorpg/encyclopedia/equipment?size=96",
  },
  {
    ID: "pets",
    url: "https://www.dofus-touch.com/en/mmorpg/encyclopedia/pets?size=96",
  },
  /* mounts are bugged because the image of the mount is not img. its fucking div :)) */
  // {
  //   ID: "mounts",
  //   url: "https://www.dofus-touch.com/en/mmorpg/encyclopedia/mounts?size=96",
  // },
  {
    ID: "consumables",
    url: "https://www.dofus-touch.com/en/mmorpg/encyclopedia/consumables?size=96",
  },
  {
    ID: "resources",
    url: "https://www.dofus-touch.com/en/mmorpg/encyclopedia/resources?size=96",
  },
  {
    ID: "ceremonial-item",
    url: "https://www.dofus-touch.com/en/mmorpg/encyclopedia/ceremonial-item?size=96",
  },
];
const rowsSelector = "table tbody tr";
const nextPageSelector = ".ak-pagination ul li>a";
(async () => {
  const browser = await launch({
    headless: true,
    args: [
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars"
    ],
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.resourceType() !== 'document') request.abort();
    else request.continue();
  });
  for (const _page of pages) {
    let url = _page.url;
    while (url !== 'javascript:void(0);') {
      console.log(url);
      await page.goto(url);
      storeItems(await fetchTableItems(page), _page.ID);
      url = await nextPageUrl(page);
    }
  }

  await browser.close();
})();

const fetchTableItems = async (page) =>
  await page.evaluate((rowsSelector) => {
    return Array.from(document.querySelectorAll(rowsSelector))
      .map((tableRow) => ({
        name: tableRow.cells[1].innerText,
        itemUrl: tableRow.cells[1].querySelector("a").href,
        imageUrl: tableRow.cells[0].querySelector("img").src,
      }))
      .map((item: Item) => {
        const itemUrlChunks = item.itemUrl.split("/");
        const itemUrlLastChunk = itemUrlChunks[itemUrlChunks.length - 1];
        const itemUrlLastChunkStringBeforeDash = itemUrlLastChunk.split("-")[0];
        item.itemId = Number(itemUrlLastChunkStringBeforeDash).valueOf();

        const imageUrlChunks = item.imageUrl.split("/");
        const imageUrlLastChunk = imageUrlChunks[imageUrlChunks.length - 1];
        const imageUrlLastChunkStringBeforeDash = imageUrlLastChunk.split(
          "."
        )[0];
        item.imageId = Number(imageUrlLastChunkStringBeforeDash).valueOf();

        return item;
      });
  }, rowsSelector);

const nextPageUrl = async (page) =>
  await page.evaluate((nextPageSelector) => {
    const links = Array.from(document.querySelectorAll(nextPageSelector));
    return links[links.length - 2].href;
  }, nextPageSelector);
const storeItems = (items: Array<Item>, partition) => {
  const fileName = `data/${partition}.json`;
  try {
    writeFileSync(
      fileName,
      JSON.stringify(
        [
          ...JSON.parse(readFileSync(fileName, { encoding: "utf-8" })),
          ...items.map((i) => ({ partition, ...i })),
        ].map((item, index) => ({ index, ...item })),
        null,
        2
      )
    );
  } catch (e) {
    writeFileSync(
      fileName,
      JSON.stringify(
        items.map((item, index) => ({ index, partition, ...item })),
        null,
        2
      )
    );
  }
};
