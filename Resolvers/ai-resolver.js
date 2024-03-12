const axios = require("axios");
const { json, JSON } = require("sequelize");
const serverAddress =
  require("../appconfig.json").AiReportResolverServerAddress;

async function getPrediction(request, response, next) {
  try {
    console.log("Request:", request.query.stockCode);

    const result = await axios.get(
      `${serverAddress}/get_pred/${request.query.stockCode}`,
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          "Content-Type": "application/json", // Add this line
        },
      }
    );

    console.log("API Response:", result.data);

    const responseBody = result.data;

    response.status(200).send(responseBody);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getPrediction,
};
