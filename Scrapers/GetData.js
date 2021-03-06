const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');
const request = require("request");
const fs = require("fs");
const JSON = require("../JSON/Builder");

let table = new Table({
    head: ['Provider', 'Spinner name', 'Release Date', 'variance', 'RTP', 'Betways', 'Layout', 'Max win', "Tech", "Min", "max", "Devices", "Features", "Tags"],
    colWidths: [15, 20, 15, 15, 15, 15, 15, 15, 15, 10, 10, 25, 200, 200]
});

exports.gatherData = async (URL) => {
    return new Promise(resolve => {
        console.log('Loading URL');

        request(URL, async function (err, response, html) {
            if (!err) {
                const $ = cheerio.load(html);

                let release = $("span.begin_date_val").eq(0).text();
                let name = $("div.divHeadName").find("h1").text();

                if (String(name).includes(":")) {
                    name = String(name).replace(":", " -");
                } else if (String(name).includes("?")) {
                    name = String(name).replace("?", "");
                } else if (String(name).includes("!")) {
                    name = String(name).replace("!", "");
                }

                let provider = $("div.provider_item").find("span").eq(0).text();
                let variance = $("span.variance_risk_val").eq(0).text();
                let RTP = $("span.RTP_val").eq(0).text();
                let betways = $("span.betway_val").eq(0).text();
                let layout = $("span.layout_val").eq(0).text();
                let maxcoins = $("span.max_coin_win_val").eq(0).text();
                let technology = $("p.technology_val").eq(0).text();
                let minbet = $("span.min_bet_val").eq(0).text();
                let maxbet = $("span.max_bet_val").eq(0).text();
                let devices = $("div.newReviewTopAttr").children().eq(13).children().eq(1).children().eq(0).text().trim();
                let image = $("div.gameItemimg").find("img").attr("src");
                const imageURL = `https://slotcatalog.com/${image}`

                let tags = [];
                $("div.tegs_slot_item").find("ul").children().each((index) => {
                    const result = $("div.tegs_slot_item").children().eq(1).children().eq(index).text();
                    tags.push(result);
                });

                let features = [];
                $("div.desc").children().each((index) => {
                    const temp = $("div.desc").children().eq(index)[0];
                    if (temp.name === "a") {
                        const result = $("div.desc").children().eq(index).text();
                        features.push(result);
                    } else if (temp.attribs.class === "clear")
                        return false;
                });

                console.log(provider, name, release, variance, RTP, betways, layout, maxcoins, technology, minbet, maxbet, devices, features, tags);

                if (checkIfEmtpy(name) && checkIfEmtpy(devices) && checkIfEmtpy(maxbet) && checkIfEmtpy(minbet) && checkIfEmtpy(technology) && checkIfEmtpy(maxcoins) && checkIfEmtpy(layout) && checkIfEmtpy(betways) && checkIfEmtpy(RTP) && checkIfEmtpy(variance) && checkIfEmtpy(provider) && checkIfEmtpy(release) && checkIfEmtpy(features) && checkIfEmtpy(tags))
                    JSON.buildJson(provider, name, release, variance, RTP, betways, layout, maxcoins, technology, minbet, maxbet, devices, features, tags, imageURL);
                else
                    console.log("------------- A variable was empty -------------");
                resolve();
            }
        });
    });
};

function checkIfEmtpy(variable) {
    const value = String(variable);
    if (value === "") {
        return false
    } else if (value.includes("Unknown")) {
        return false
    } else return value !== null;
}
