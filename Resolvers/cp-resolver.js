const { TableReportProviderServerAddress } = require("../appconfig.json");
const axios = require("axios");
async function getPaginatedCpStocks(request, response, next) {
  try {
    const result = await axios.get(
      `${TableReportProviderServerAddress}/cpdemo/all/${request.query.pageIndex}`,
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
    const grouped = responseBody.data.reduce((acc, obj) => {
      const key = obj.date + "-" + obj.symbol;
      if (!acc[key]) {
        acc[key] = {
          date: obj.date,
          symbol: obj.symbol,
          fundamental: [],
        };
      }
      acc[key].fundamental.push(obj);
      return acc;
    }, {});

    const responseModel = {
      totalCount: responseBody.total,
      stocks: Object.values(grouped).map((item) => ({
        date: item.date,
        symbol: item.symbol,
        fundamental: item.fundamental,
      })),
    };
    response.status(200).send(JSON.stringify(responseModel));
  } catch (e) {
    next(e);
  }
}
module.exports = { getPaginatedCpStocks };
