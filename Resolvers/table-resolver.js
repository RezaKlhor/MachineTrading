const { TableReportProviderServerAddress: tableReportProviderServerAddress } = require("../appconfig.json");
const axios = require("axios");

async function getTable(request, response) {
  try {
    const result = await axios.get(
      `${tableReportProviderServerAddress}/tablo/all/${request.body.date}`,
      {
        headers: {
          accept:
            "application/json",
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
    response
      .status(400)
      .send(
        `get table info caused error because the date is an off day for stock market and the exception was ${e} and the server address was ${tableReportProviderServerAddress}`
      );
  }
}
module.exports = {
  getTable,
};
