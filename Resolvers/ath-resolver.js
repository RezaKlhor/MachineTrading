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
    newArray.sort((a, b) => b.to_ath - a.to_ath);
    newArray = newArray.map((stock, index) => ({ index: index + 1, ...stock }));
    newArray = filterData(
      newArray,
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
    const categoryArray = isArrayWithData(category) ? JSON.parse(category) : [];
    const categoryCond =
      categoryArray.length > 0
        ? categoryArray.some((cate) => cate == stock.type)
        : true;

    const nameCond = name ? stock.stockTitle.includes(name) : true;
    return categoryCond && nameCond;
  });
  return data;
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
module.exports = { getAll, getOne };
