const { TableReportProviderServerAddress } = require("../appconfig.json");
const axios = require("axios");
async function getTotal(request, response, next) {
  try {
    const result = await axios.get(
      `${TableReportProviderServerAddress}/fearngreed?date=${request.query.date}`,
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
    const responseBody = { total: result.data.total };
    response.status(200).send(responseBody);
  } catch (e) {
    next(e);
  }
}
module.exports = {
  getTotal,
};
