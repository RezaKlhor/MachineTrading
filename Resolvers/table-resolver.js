const { TableReportProviderServerAddress } = require("../appconfig.json");
const axios = require("axios");
const { getErrorText } = require("../Middlewares/ErrorProducer");
async function getTable(request, response, next) {
  try {
    const result = await axios.get(
      `${TableReportProviderServerAddress}/tablo/single/${request.query.stockCode}/${request.query.date}`,
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
    response.status(200).send(responseBody);
  } catch (e) {
    next(e);
  }
}
async function getAllBoard(request, response, next) {
  try {
    const result = await axios.get(
      `${TableReportProviderServerAddress}/tablo/all/${request.query.date}`,
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
    const stocks = result.data;
    let newArray = Object.entries(result.data).map(([key, value]) => {
      return { stockTitle: key, ...value };
    });
    newArray.sort((a, b) => b.sum - a.sum);
    newArray = newArray.map((stock, index) => ({ index: index + 1, ...stock }));
    newArray = filterData(
      newArray,
      request.query.intelMoneyArg,
      request.query.susArg,
      request.query.realMoneyArg,
      request.query.finalLastArg,
      request.query.buyPowerArg,
      request.query.categoryArg,
      request.query.nameArg
    );
    response.status(200).send(JSON.stringify(newArray));
  } catch (e) {
    next(e);
  }
}
function filterData(
  data,
  intelMoney,
  susVol,
  realMoney,
  finalLast,
  buyPoswer,
  category,
  name
) {
  data = data.filter((stock) => {
    function isArrayWithData(data) {
      if (typeof data === "string") {
        try {
          const parsedData = JSON.parse(data);
          return Array.isArray(parsedData) && parsedData.length > 0;
        } catch (error) {
          return false;
        }
      } else {
        return Array.isArray(data) && data.length > 0;
      }
    }

    const intelMoneyArray = isArrayWithData(intelMoney)
      ? JSON.parse(intelMoney)
      : [];
    const susVolArray = isArrayWithData(susVol) ? JSON.parse(susVol) : [];
    const realMoneyArray = isArrayWithData(realMoney)
      ? JSON.parse(realMoney)
      : [];
    const finalLastArray = isArrayWithData(finalLast)
      ? JSON.parse(finalLast)
      : [];
    const categoryArray = isArrayWithData(category) ? JSON.parse(category) : [];
    const buyPoswerArray = isArrayWithData(buyPoswer)
      ? JSON.parse(buyPoswer)
      : [];

    const intelMoneyCond =
      intelMoneyArray.length > 0
        ? intelMoneyArray.some((i) => stock.intel_money == i)
        : true;

    const susCond =
      susVolArray.length > 0
        ? susVolArray.some((i) => stock.suspicios_volume == i)
        : true;

    const realMoneyCond =
      realMoneyArray.length > 0
        ? realMoneyArray.some((i) => stock.real_money == i)
        : true;

    const finalCond =
      finalLastArray.length > 0
        ? finalLastArray.some((i) => stock.final_last == i)
        : true;
    const buyPoswerCond =
      buyPoswerArray.length > 0
        ? buyPoswerArray.some((i) => stock.buy_power == i)
        : true;
    const categoryCond =
      categoryArray.length > 0
        ? categoryArray.some((cate) => cate == stock.type)
        : true;

    const nameCond = name ? stock.stockTitle.includes(name) : true;
    return (
      intelMoneyCond &&
      susCond &&
      realMoneyCond &&
      finalCond &&
      categoryCond &&
      nameCond &&
      buyPoswerCond
    );
  });
  return data;
}
async function getCategories(request, response, next) {
  try {
    const result = await axios.get(
      `${TableReportProviderServerAddress}/tablo/types`,
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
    response.status(200).send(JSON.stringify(result.data));
  } catch (e) {
    next(e);
  }
}
module.exports = {
  getTable,
  getAllBoard,
  getCategories,
};
