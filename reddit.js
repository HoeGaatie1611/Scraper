const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://old.reddit.com/top/";

request(url, function(err, response, html) {
    if(!err) {
        const $ = cheerio.load(html);
        const allItems = $("#main_page").children(); //gebaseerd op de ID
        let items = [];
        allItems.each((index) => {
            //het vierde child van het element sitetable
            const result = $("#main_page").children().eq(index).children().eq(4).find("a.title").text();
            if(result !== "") {
                items.push(result)
            }
            // items.push($("#siteTable").children().eq(index).children().eq(4).find("a.title").text());
        });

        fs.writeFile("output.csv", JSON.stringify(items, null, 4), (err) => {
            if(err)
                console.log(err);
            else
                console.log("Data has been added");
        });
    }
});
