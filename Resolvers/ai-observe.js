const stocks = require("../Database/stocks.json");
function getWeeklyStocksData(preds) {
  const oscillationData = Object.entries(preds)
    .map(([key, value], index) => {
      try{
        return {
          name: stocks.find((s) => s.code == key).symbol,
          confidence: value.weekly.sureness * 100,
          label: value.weekly.trend,
          date: value.weekly.start_date,
          success: value.weekly.success,
        };

      }catch(e){

      }
    })
    .sort((a, b) => b.confidence - a.confidence);
  return oscillationData;
}
function getMonthlyStocksData(preds) {
  const oscillationData = Object.entries(preds)
    .map(([key, value], index) => ({
      name: stocks.find((s) => s.code == key).symbol,
      confidence: value.monthly.sureness * 100,
      label: value.monthly.trend,
      date: value.monthly.start_date,
      success: value.monthly.success,
    }))
    .sort((a, b) => b.confidence - a.confidence);
  return oscillationData;
}
function getOscStocksData(preds) {
  const oscillationData = Object.entries(preds)
    .map(([key, value], index) => ({
      name: stocks.find((s) => s.code == key).symbol,
      confidence: value.weekly_oscillator.sureness,
      label: value.weekly_oscillator.trend,
      date: value.weekly_oscillator.start_date,
      success: value.weekly_oscillator.success,
    }))
    .sort((a, b) => b.confidence - a.confidence);
  return oscillationData;
}
module.exports = {
  getOscStocksData,
  getMonthlyStocksData,
  getWeeklyStocksData,
};
