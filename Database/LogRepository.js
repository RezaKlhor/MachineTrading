const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const { connectionString } = require("../appconfig.json");
let client;

async function log(message) {
  try {
    const db = await getDb();
    const newId = new mongodb.ObjectId();
    const package = {
      _id: newId,
      message,
      time: new Date().getTime(),
    };
    await db.collection("logs").insertOne(package);
    return newId;
  } catch (e) {
    console.log(e.message);
  }
}

async function getDb() {
  if (!client) {
    const uri = connectionString;
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 2000,
    });
  }
  const db = client.db("MachineTrading");
  return db;
}

module.exports = {
  log,
};
