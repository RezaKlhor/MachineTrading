const { TableReportProviderServerAddress } = require("../appconfig.json");
const axios = require("axios");
async function getAll(request, response, next) {
  try {
    const result = await axios.get(
      `${TableReportProviderServerAddress}/athl/all`,
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
    let newArray = Object.entries(result.data).map(([key, value]) => {
      return { stockTitle: key, ...value };
    });
    newArray = newArray.map((stock, index) => ({ index: index + 1, ...stock }));
    response.status(200).send(JSON.stringify(newArray));
  } catch (e) {
    next(e);
  }
}
async function getOne(request, response, next) {
  try {
    const result = await axios.get(
      `${TableReportProviderServerAddress}/athl/single/${request.query.stockCode}`,
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
module.exports = { getAll ,getOne};
