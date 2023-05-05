const xml2js = require("xml2js");
const fs = require("fs");

const parser = new xml2js.Parser();

const xmlData = fs.readFileSync("Database\\ptoe.xml", "utf8");

async function getData() {
  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const data = result; // Here you can extract the necessary data from the result object
        resolve(data);
      }
    });
  });
}
module.exports={getData}