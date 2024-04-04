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
      const shouldInserted = filterData(
        obj,
        request.query.nameArg,
        request.query.categoryArg,
        request.query.importanceArg,
        request.query.announcementArg,
        request.query.isAuditedArg
      );
      if (shouldInserted) acc[key].fundamental.push(obj);
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
    responseModel.stocks=responseModel.stocks.filter(s=> s.fundamental.length>0)
    response.status(200).send(JSON.stringify(responseModel));
  } catch (e) {
    next(e);
  }
}
function filterData(
  data,
  name,
  category,
  importance,
  announcement_type,
  is_audited
) {
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
  const announcmentTypeArray = isArrayWithData(announcement_type)
    ? JSON.parse(announcement_type)
    : [];
  const importanceArray = isArrayWithData(importance)
    ? JSON.parse(importance)
    : [];
  const categoryCond =
    categoryArray.length > 0
      ? categoryArray.some((cate) => cate == data.type)
      : true;
  const announcmentTypeCond =
    announcmentTypeArray.length > 0
      ? announcmentTypeArray.some((cate) => cate == data.announcement_type)
      : true;
  const importanceCond =
    importanceArray.length > 0
      ? importanceArray.some((cate) => cate == data.importance)
      : true;
  const is_auditedCond = !is_audited ? true : data.is_audited == is_audited;
  const nameCond = name ? data.symbol.includes(name) : true;
  return (
    importanceCond &&
    is_auditedCond &&
    announcmentTypeCond &&
    categoryCond &&
    nameCond
  );
}
module.exports = { getPaginatedCpStocks };
