const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");

let client;

async function createUser(phonenumber, email, password, fullname) {
  const db = await getDb();
  const newId = new mongodb.ObjectId();
  const User = {
    _id: newId,
    phonenumber,
    email,
    password,
    fullname,
  };
  await db.collection("Users").insertOne(User);
  return newId;
}

async function getUsers() {
  const db = await getDb();
  const Users = await db.collection("Users").find().toArray();
  return Users;
}

async function getUserById(id) {
  if (!id) {
    return;
  }
  const db = await getDb();
  const User = await db
    .collection("Users")
    .findOne({ _id: new mongodb.ObjectId(id) });
  return User;
}
async function getUserByEmail(email) {
  const db = await getDb();
  const User = await db.collection("Users").findOne({ email });
  return User;
}
async function updateUser(User) {
  const db = await getDb();
  const updatedUser = await db
    .collection("Users")
    .findOneAndUpdate(
      { _id: new mongodb.ObjectId(User._id) },
      { $set: User },
      { returnOriginal: false }
    );
  return updatedUser.value;
}

async function deleteUser(id) {
  const db = await getDb();
  const deletedUser = await db
    .collection("Users")
    .findOneAndDelete({ _id: new mongodb.ObjectId(id) });
  return deletedUser.value;
}

async function getDb() {
  if (!client) {
    const uri =
      "mongodb://127.0.0.1:27017";
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const db = client.db("MachineTrading");
  return db;
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail
};
