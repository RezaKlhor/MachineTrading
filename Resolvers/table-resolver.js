const { TableReportProviderServerAddress } = require("../appconfig.json");
async function getTable(request, response) {
  try {
    const result = await fetch(
      `${TableReportProviderServerAddress}/tablo/all/${request.body.date}`,
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          "proxy-connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          cookie: "csrftoken=f8K3nPDeXeMN2spRhiwM7pxxqYZ9tJH7",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
      }
    );
    const responseBpdy = await result.text();
    response.status(200).send(responseBpdy);
  } catch (e) {
    response
      .status(400)
      .send(
        "get table info caused error because the date is an off day for stock market"
      );
  }
}
module.exports = {
  getTable,
};