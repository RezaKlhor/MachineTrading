const data = require("./today.json")
const stocks = require("../Database/stocks.json");
const preds = Object.fromEntries(
  Object.entries(data).filter(([key, value]) => key != 1 && key != 57)
);
const kolBours = Object.entries(data).find(([key, value]) => key == 1)[1];
const kolHamvazn = Object.entries(data).find(([key, value]) => key == 57)[1];
function getWeeklyStocksData() {
  const oscillationData = Object.entries(preds)
    .map(([key, value], index) => {
      try {
        return {
          name: stocks.find((s) => s.code == key).symbol,
          confidence: value.weekly.sureness * 100,
          label: value.weekly.trend,
        };
      } catch (e) {}
    })
    .sort((a, b) => b.confidence - a.confidence);
  return oscillationData;
}
function getMonthlyStocksData() {
  const oscillationData = Object.entries(preds)
    .map(([key, value], index) => {
      try {
        return {
          name: stocks.find((s) => s.code == key).symbol,
          confidence: value.monthly.sureness * 100,
          label: value.monthly.trend,
        };
      } catch (e) {
        console.log(e);
      }
    })
    .sort((a, b) => b.confidence - a.confidence);
  return oscillationData;
}
function getOscStocksData() {
  const oscillationData = Object.entries(preds)
    .map(([key, value], index) => ({
      name: stocks.find((s) => s.code == key).symbol,
      confidence: value.weekly_oscillator.sureness,
      label: value.weekly_oscillator.trend,
    }))
    .sort((a, b) => b.confidence - a.confidence);
  return oscillationData;
}
function getKoldata() {
  const kolName = stocks.find((s) => s.code == 1).symbol;
  const kol = {
    weekly: {
      confidence: kolBours.weekly.sureness * 100,
      label: kolBours.weekly.trend,
    },
    monthly: {
      confidence: kolBours.monthly.sureness * 100,
      label: kolBours.monthly.trend,
    },
    osc: {
      confidence: kolBours.weekly_oscillator.sureness,
      label: kolBours.weekly_oscillator.trend,
    },
  };
  const hamvaznName = stocks.find((s) => s.code == 57).symbol;
  const hamvazn = {
    weekly: {
      confidence: kolHamvazn.weekly.sureness * 100,
      label: kolHamvazn.weekly.trend,
    },
    monthly: {
      confidence: kolHamvazn.monthly.sureness * 100,
      label: kolHamvazn.monthly.trend,
    },
    osc: {
      confidence: kolHamvazn.weekly_oscillator.sureness,
      label: kolHamvazn.weekly_oscillator.trend,
    },
  };
  return {
    [kolName]: kol,
    [hamvaznName]: hamvazn,
  };
}
module.exports = {
  getKoldata,
  getOscStocksData,
  getMonthlyStocksData,
  getWeeklyStocksData,
  data,
};
