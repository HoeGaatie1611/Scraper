module.exports = {
    buildJson: function (provider, name, release, variance, RTP, betways, layout, maxcoins, technology, minbet, maxbet, devices, features, tags, img) {
        let json = {
            "Slot_Name": name,
            "Provider": provider,
            "Release_Date": release,
            "Variance": variance,
            "RTP": parseFloat(RTP),
            "Betways": parseInt(betways),
            "Layout": layout,
            "Max_Coins": parseInt(maxcoins),
            "Technologies": technology,
            "Min_bet": parseFloat(minbet),
            "Max_bet": parseFloat(maxbet),
            "Devices": devices,
            "Features": features,
            "Tags": tags,
            "Img_URL": img
        };

        const fs = require('fs-path');
        // fs.writeFile('myjsonfile.json', jsonObject);
        fs.writeFile(`Files/${name}.json`, JSON.stringify(json), (err) => {
            if (err) throw err; //error
            console.log('The file has been saved!')
        });
    }
};