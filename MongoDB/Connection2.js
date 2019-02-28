const {
    Stitch,
    AnonymousCredential,
} = require('mongodb-stitch-server-sdk');

const client = Stitch.initializeDefaultAppClient('slot-scraper-csdnd');

console.log("logging in anonymously");
client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
    console.log(`logged in anonymously as user ${user.id}`)
});

client.callFunction("insertSlot", ["Heyhoi", "21-94-1948"]).then(echoedResult => {
    console.log(echoedResult.error);
});

client.close();