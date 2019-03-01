const rp = require('request-promise');
const cheerio = require('cheerio');
const request = require("request");
const fs = require("fs");
const dataGrabber = require("./Scrapers/GetData.js");
const async = require("async");

const url = "https://slotcatalog.com/en/type/Video_Slots/1";

request(url, async function (err, response, html) {
        if (!err) {
            const $ = cheerio.load(html);
            const allItems = $(".main_page").find("div.slot_preview_square"); //gebaseerd op de ID

            for (let i = 0; i < allItems.length; i++) {
                await getData(i, allItems);
            }
        }
});

function getData(index, allItems) {
    return new Promise(async resolve => {
        const slot = allItems.eq(index).find("h3").text().trim();
        console.log(`\nCurrent slot: ${slot}`);
        const href = `https://slotcatalog.com${allItems.eq(index).find("h3").find("a")[0].attribs.href}`;
        await dataGrabber.gatherData(href);
        resolve();
    })
}