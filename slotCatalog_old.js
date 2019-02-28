const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');
const request = require("request");
const fs = require("fs");

let table = new Table({
    head: ['Index', 'Spinner name', 'Publisher'],
    colWidths: [10, 40, 40]
});

const url = "https://slotcatalog.com/en/type/Video_Slots/1";

process.stdout.write('loading');

function printData() {
    console.log("✔");
    console.log(table.toString());
}

request(url, function(err, response, html) {
    if(!err) {
        const $ = cheerio.load(html);
        const allItems = $(".main_page").children(); //gebaseerd op de ID
        let items = [];
        allItems.each((index) => {
            process.stdout.write(".");
            //het vierde child van het element sitetable
            const result = $(".main_page").children().eq(index).children().eq(1).find("h3").text();
            const publisher = $(".main_page").children().eq(index).children().eq(1).find("h3").find(".good_link").text();
            if(result !== "") {
                table.push([index, result, publisher]);
                items.push(result)
            }
        });

        fs.writeFile("output.txt", JSON.stringify(items, null, 4), (err) => {
            if(err)
                console.log(err);
            else
                printData();
        });
    }
});