const { TableReportProviderServerAddress } = require("../appconfig.json");
const axios = require("axios");
async function getAllTechnical(request, response, next) {
  try {
    const result = await axios.get(
      request.query.date?`${TableReportProviderServerAddress}/technical/all/?date=${request.query.date}`:`${TableReportProviderServerAddress}/technical/all`,
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

    let newArray = Object.entries(result.data).map(([key, value]) => {
      // Filter out key-value pairs with values false or null
      const filteredValue = Object.fromEntries(
        Object.entries(value).filter(
          ([, v]) => v !== false && v !== null
        )
      );
      return { stockTitle: key, ...filteredValue };
    });

    const name = request.query.nameArg;
    newArray = newArray.filter((item) =>
      name ? item.stockTitle.includes(name) : true
    );

    response.status(200).send(newArray);
  } catch (e) {
    next(e);
  }
}
module.exports = {
  getAllTechnical,
};
