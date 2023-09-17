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
    const newArray = Object.entries(result.data).map(([key, value]) => {
      return { stockTitle: key, ...value };
    });
    newArray.sort((a, b) => b.sum - a.sum);
    response.status(200).send(JSON.stringify(newArray));
  } catch (e) {
    next(e);
  }
}
module.exports = {
  getTable,
  getAllBoard,
};
