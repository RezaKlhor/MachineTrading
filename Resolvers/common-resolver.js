const { TableReportProviderServerAddress } = require("../appconfig.json");
const axios = require("axios");

async function getStocks(request, response) {
  try {
    const result = await axios.get(
      `${TableReportProviderServerAddress}/ticker-codes`,
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
    response.status(500).send(`internal server error!`);
  }
}
async function getMarketOverallParameters(request, response, next){
  try{
    const overallMarketStatisticsResult = await axios.get(
      `${TableReportProviderServerAddress}/onelook`,
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
    const overallMarketStatistics = overallMarketStatisticsResult.data;

    const redGreenResult = await axios.get(
      `${TableReportProviderServerAddress}/redgreens`,
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
    const redGreen=redGreenResult.data
    const result = {...overallMarketStatistics,...redGreen}
    response.status(200).send(result);
  }catch(e){
    response.status(500).send(`internal server error!`);
  }
}
module.exports={
    getMarketOverallParameters,
    getStocks
}