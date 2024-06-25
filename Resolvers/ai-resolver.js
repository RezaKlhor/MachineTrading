const axios = require("axios");
const { json, JSON } = require("sequelize");
const static = require("./all_preds");
const lastWeek = require("./lastWeek.json");
const aiObserve = require("./ai-observe");
const lastMonth = require("./lastMonth.json");
const {
  TableReportProviderServerAddress,
  AiReportResolverServerAddress,
} = require("../appconfig.json");
const serverAddress =
  require("../appconfig.json").AiReportResolverServerAddress;
const stocks = require("../Database/stocks.json");
const { ReturnDocument } = require("mongodb");
async function getAiData() {
  const result = await axios.get(`${AiReportResolverServerAddress}/get_all`, {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9,fa;q=0.8",
      "proxy-connection": "keep-alive",
      "upgrade-insecure-requests": "1",
      cookie: "csrftoken=f8K3nPDeXeMN2spRhiwM7pxxqYZ9tJH7",
    },
  });
  return result.data;
}
async function getStockPrediction(request, response, next) {
  try {
    const data = await getAiData();
    const stockName = request.query.stockName;
    const weeklyData = static.getWeeklyStocksData(data);
    const monthlyData = static.getMonthlyStocksData(data);
    const oscData = static.getOscStocksData(data);
    const result = {
      weekly: weeklyData.find((s) => s.name == stockName),
      monthly: monthlyData.find((s) => s.name == stockName),
      osc: oscData.find((s) => s.name == stockName),
    };
    if (!result.weekly) response.status(404).send();
    else response.status(200).send(result);
  } catch (e) {
    next(e);
  }
}
async function getAllWeeklyPrediction(request, response, next) {
  try {
    const data = await getAiData();
    const stockName = request.query.stockName;

    const oscillationData = static.getWeeklyStocksData(data);
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
    const data = await getAiData();
    const stockName = request.query.stockName;
    const oscillationData = static.getMonthlyStocksData(data);
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
    const data = await getAiData();
    const stockName = request.query.stockName;
    const oscillationData = static.getOscStocksData(data);
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
    const data = await getAiData();
    const overall = static.getKoldata(data);
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
  getStockPrediction,
};
