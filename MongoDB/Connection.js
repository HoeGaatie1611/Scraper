const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('slot-scraper-csdnd');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-slotScraper').db('SlotCatalog');

client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
    db.collection('data').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() =>
    db.collection('data').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
    console.log("Found docs", docs);
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});