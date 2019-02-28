const rp = require('request-promise');
const cheerio = require('cheerio');
const request = require("request");
const fs = require("fs");
const dataGrabber = require("./Scrapers/GetData.js");
const async = require("async");

const url = "https://slotcatalog.com/en/type/Video_Slots/1";

process.stdout.write('loading');

request(url, function (err, response, html) {
        if (!err) {
            const $ = cheerio.load(html);
            const allItems = $(".main_page").find("div.slot_preview_square"); //gebaseerd op de ID
            let items = [];
            allItems.each((index) => {
                process.stdout.write(".");
                console.log(allItems.eq(index).find("h3").text());
                const href = `https://slotcatalog.com${allItems.eq(index).find("h3").find("a")[0].attribs.href}`;
                dataGrabber.gatherData(href);
            });
        }
});