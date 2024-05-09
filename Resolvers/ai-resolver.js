const axios = require("axios");
const { json, JSON } = require("sequelize");
const static = require("./all_preds");
const serverAddress =
  require("../appconfig.json").AiReportResolverServerAddress;
const stocks = require("../Database/stocks.json");

async function getAllWeeklyPrediction(request, response, next) {
  try {
    const oscillationData = static.getWeeklyStocksData();
    response.status(200).send(oscillationData);
  } catch (e) {
    next(e);
  }
}
async function getAllMonthlyPrediction(request, response, next) {
  try {
    const oscillationData = static.getMonthlyStocksData();
    response.status(200).send(oscillationData);
  } catch (e) {
    next(e);
  }
}
async function getOscPrediction(request, response, next) {
  try {
    const oscillationData = static.getOscStocksData();
    response.status(200).send(oscillationData);
  } catch (e) {
    next(e);
  }
}
async function getOverall(request, response, next) {
  try {
    const overall= static.getKoldata()
    response.status(200).send(overall);
  } catch (e) {
    next(e);
  }
}
module.exports = {
  getOscPrediction,
  getAllWeeklyPrediction,
  getAllMonthlyPrediction,
  getOverall
};
