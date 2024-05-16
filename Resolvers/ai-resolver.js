const axios = require("axios");
const { json, JSON } = require("sequelize");
const static = require("./all_preds");
const lastWeek = require("./lastWeek.json");
const aiObserve = require("./ai-observe");
const lastMonth = require("./lastMonth.json");
const { TableReportProviderServerAddress } = require("../appconfig.json");
const serverAddress =
  require("../appconfig.json").AiReportResolverServerAddress;
const stocks = require("../Database/stocks.json");

async function getAllWeeklyPrediction(request, response, next) {
  try {
    const stockName = request.query.stockName;

    const oscillationData = static.getWeeklyStocksData();
    response
      .status(200)
      .send(
        stockName
          ? oscillationData.find((s) => s.name == stockName)
          : oscillationData
      );
  } catch (e) {
    next(e);
  }
}
async function getAllMonthlyPrediction(request, response, next) {
  try {
    const stockName = request.query.stockName;
    const oscillationData = static.getMonthlyStocksData();
    response
      .status(200)
      .send(
        stockName
          ? oscillationData.find((s) => s.name == stockName)
          : oscillationData
      );
  } catch (e) {
    next(e);
  }
}
async function getOscPrediction(request, response, next) {
  try {
    const stockName = request.query.stockName;
    const oscillationData = static.getOscStocksData();
    response
      .status(200)
      .send(
        stockName
          ? oscillationData.find((s) => s.name == stockName)
          : oscillationData
      );
  } catch (e) {
    next(e);
  }
}
async function getOverall(request, response, next) {
  try {
    const overall = static.getKoldata();
    response.status(200).send(overall);
  } catch (e) {
    next(e);
  }
}
async function getAllWeeklyPredictionObserve(request, response, next) {
  try {
    const result = await axios.post(
      `${TableReportProviderServerAddress}/predtest/all/`,
      lastWeek, // Pass lastWeek as the data property
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
      `${TableReportProviderServerAddress}/predtest/all/`,
      lastWeek, // Pass lastWeek as the data property
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
      `${TableReportProviderServerAddress}/predtest/all/`,
      lastMonth, // Pass lastWeek as the data property
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
module.exports = {
  getOscPrediction,
  getAllWeeklyPrediction,
  getAllMonthlyPrediction,
  getOverall,
  getAllWeeklyPredictionObserve,
  getAllMonthlyPredictionObserve,
  getAllOscPredictionObserve,
};
