const cheerio = require('cheerio');
const request = require("request");
const dataGrabber = require("./Scrapers/GetData.js");


// const url = "https://slotcatalog.com/en/type/Video_Slots/1";

findData(1);

async function findData(index) {
        const url = `https://slotcatalog.com/en/type/Video_Slots/${index}`;
        request(url, async function (err, response, html) {
            if (!err) {
                const $ = cheerio.load(html);
                const found = $(".main_page").find("h2").text(); //gebaseerd op de ID
                console.log(String(found));
                if (String(found) === "Nothing found :(") {
                    return true;
                } else if(index === 2) {
                    return true;
                } else {
                    await getPage(url);
                    return findData(index + 1)
                }
            }
        });
}

function getPage(url) {
    return new Promise(async resolve => {
        request(url, async function (err, response, html) {
            if (!err) {
                const $ = cheerio.load(html);
                const allItems = $(".main_page").find("div.slot_preview_square"); //gebaseerd op de ID

                for (let i = 0; i < allItems.length; i++) {
                    await getData(i, allItems);
                }
                resolve();
            }
        });
    });
}

function getData(index, allItems) {
    return new Promise(async resolve => {
        const slot = allItems.eq(index).find("h3").text().trim();
        console.log(`\nCurrent slot: ${slot}`);
        const href = `https://slotcatalog.com${allItems.eq(index).find("h3").find("a")[0].attribs.href}`;
        await dataGrabber.gatherData(href);
        resolve();
    })
}