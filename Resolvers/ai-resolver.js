const axios = require("axios");
const static = require("./all_preds");
const lastWeek = require("./lastWeek.json");
const aiObserve = require("./ai-observe");
const lastMonth = require("./lastMonth.json");
const fs= require('fs')
const path= require('path')
const {
  TableReportProviderServerAddress
} = require("../appconfig.json");

function getPredictByDate(date) {
  try {
    const fileString = fs.readFileSync(`./Resolvers/Predicts/${date}.json`, 'utf8');
    const jsonData = JSON.parse(fileString);
    return jsonData;
  } catch (error) {
    console.error(`Error reading or parsing JSON file for date ${date}:`, error.message);
    throw error;
  }
}
async function getAllWeeklyPredictionObserve(request, response, next) {
  try {
    const result = await axios.post(
      `${TableReportProviderServerAddress}/predtest/all/?date=${request.query.date}`,
      getPredictByDate(request.query.date), // Pass lastWeek as the data property
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          "proxy-connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          cookie: "csrftoken=f8K3nPDeXeMN2spRhiwM7pxxqYZ9tJH7",
        },
      }
    );
    const responseBody = result.data;
    const observedData = aiObserve.getWeeklyStocksData(responseBody);
    response.status(200).send(observedData);
  } catch (e) {
    next(e);
  }
}
async function getAllOscPredictionObserve(request, response, next) {
  try {
    const result = await axios.post(
      `${TableReportProviderServerAddress}/predtest/all/?date=${request.query.date}`,
      getPredictByDate(request.query.date), // Pass lastWeek as the data property
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          "proxy-connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          cookie: "csrftoken=f8K3nPDeXeMN2spRhiwM7pxxqYZ9tJH7",
        },
      }
    );
    const responseBody = result.data;
    const observedData = aiObserve.getOscStocksData(responseBody);
    response.status(200).send(observedData);
  } catch (e) {
    next(e);
  }
}
async function getAllMonthlyPredictionObserve(request, response, next) {
  try {
    const result = await axios.post(
      `${TableReportProviderServerAddress}/predtest/all/?date=${request.query.date}`,
      getPredictByDate(request.query.date), // Pass lastWeek as the data property
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          "proxy-connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          cookie: "csrftoken=f8K3nPDeXeMN2spRhiwM7pxxqYZ9tJH7",
        },
      }
    );
    const responseBody = result.data;
    const observedData = aiObserve.getMonthlyStocksData(responseBody);
    response.status(200).send(observedData);
  } catch (e) {
    next(e);
  }
}
async function getAvailablePredicts(request, response, next) {
  try {
    const availableFiles= getJsonFilenamesWithoutExtension('./Resolvers/Predicts')
    response.status(200).send(availableFiles);
  } catch (e) {
    next(e);
  }
}
function sortDateStringsDesc(dateStrings) {
  function parseDate(dateStr) {
    let year, month, day;
    if (dateStr.split('-')[0].length === 1) {
      year = 2000 + parseInt(dateStr.split('-')[0], 10);
    } else {
      year = 2000 + parseInt(dateStr.split('-')[0], 10);
    }
    month = parseInt(dateStr.split('-')[1], 10) - 1; 
    day = parseInt(dateStr.split('-')[2], 10);

    return new Date(year, month, day);
  }
  return dateStrings
    .map(dateStr => ({ original: dateStr, date: parseDate(dateStr) }))
    .sort((a, b) => b.date - a.date) // Change comparison for descending order
    .map(item => item.original);
}
function getJsonFilenamesWithoutExtension(dirPath) {
  const files = fs.readdirSync(dirPath);
  const jsonFilenames = files
    .filter(file => path.extname(file) === '.json')  // Filter for .json files
    .map(file => path.basename(file, '.json'));      // Remove the .json extension
  return sortDateStringsDesc(jsonFilenames);
}
module.exports = {
  getAllWeeklyPredictionObserve,
  getAllMonthlyPredictionObserve,
  getAllOscPredictionObserve,
  getAvailablePredicts
};
