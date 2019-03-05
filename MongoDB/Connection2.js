const {
    Stitch,
    AnonymousCredential,
} = require('mongodb-stitch-server-sdk');

const client = Stitch.initializeDefaultAppClient('scraper-zebgo');

console.log("logging in anonymously");
client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
    console.log(`logged in anonymously as user ${user.id}`)
});

//exports = function(provider, name, release, variance, rtp, betways, layout, maxcoins, technology, minbet, maxbet, devices, features, tags){
client.callFunction("InsertSlot", ["NextGen", "Monster Wins", "22.06.2016", "MED-HIGH", 97.12, 1024, "5*4", 10000, "FLASH, JS, HTML5", 0.5, 12500, "22.06.2016", [
    "Bonus Game",
    "FreeSpins",
    "Risk (Double) game",
    "Scatter symbols",
    "Wild"
], [
    "Bonus Game",
    "FreeSpins",
    "Risk (Double) game",
    "Scatter symbols",
    "Wild",
    "Space",
    "Adventure",
    "Fantastic",
    "Blue",
    "Dark blue",
    "Darkness",
    "Joy",
    "Lightness",
    "Aliens",
    "Monsters"
]]).then(echoedResult => {
    console.log(echoedResult.error);
});

client.close();