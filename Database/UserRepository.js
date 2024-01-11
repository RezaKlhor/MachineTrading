const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const {connectionString}= require("../appconfig.json")

let client;
// 
async function createUser(phonenumber, email, password, firstName,lastName,userName,nationalCode,type,companyname,claims) {
  const db = await getDb();
  const User = {
    _id: userName,
    password,
    firstName,
    lastName,
    nationalCode,
    phonenumber,
    email,
    type,
    companyname,
    claims
  };
  await db.collection("Users").insertOne(User);
  return userName;
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
    .findOne({ _id: id });
  return User;
}
async function getUserExistance(username,nationalCode) {
  const db = await getDb();
  const pipeline = [
    {
      '$match': {
        '$or': [
          {
            '_id': username
          }, {
            'nationalCode': nationalCode
          }
        ]
      }
    }
  ];
  const users = await db.collection("Users").aggregate(pipeline).toArray();
  return users.length>0;
}
async function getUserByNationalCode(nationalCode){
  const db = await getDb();
  const user = await db.collection("Users").findOne({nationalCode});
  return user;
}
async function updateUser(user) {
  const db = await getDb();
  const existingUser = await getUserByNationalCode(user.nationalCode);
  if (existingUser && existingUser._id !== user._id) {
    throw new Error("user already exists");
  }
  const updatedUser = await db
    .collection("Users")
    .findOneAndUpdate(
      { _id: user._id },
      { $set: user },
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
    connectionString;
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
  getUserExistance
};
