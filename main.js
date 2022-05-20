const puppeteer = require('puppeteer');
const fs = require('fs');
const writeStream = fs.createWriteStream('crawledlinks.txt');

async function crawl(website){
  let links = [];

  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(arguments[0]);

    const hrefs = await page.$$eval("a", (list) => list.map((elm) => elm.href));
    for (let i = 0; i < hrefs.length; i++) {
      links.push(hrefs[i]);
    }

    await browser.close();
  } catch (error) {
    // dont do anything
  }

  return links;
};

(async () => {
  var links = ['https://notaidan.com'];



  for(let i = 0; i < links.length; i++){

    let output = crawl(links[i]);

    // adds output to the links array
    links.push.apply(links, await output);

    links.forEach(value => writeStream.write(`${value}\n`));
    console.log(await output);
  }
})();
