const axios = require("axios");
const { json } = require("sequelize");
const serverAddress =
  require("../appconfig.json").AiReportResolverServerAddress;

async function getPrediction(request, response) {
  try {
    const body = {
        "data": {
          "stock_code": request.body.stockCode,
          "model": "prophet",
          "period": "1_d"
        }
      };
      
      const result = await axios.get(`${serverAddress}/predict`, {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          "Content-Type": "application/json" // Add this line
        },
        data: JSON.stringify(body) // Change "body" to "data"
      });
    const responseBody = result.data;

    if(responseBody=="prediction failed!"){
        response.status(400).send(`get prediction failed because you requested for a stock wich is not trained try calling train api before get prediction for stock code ${request.body.stockCode}`)
        return
    }
    const predictionResult = JSON.parse(responseBody.predict)[0]
    response.status(200).send(JSON.stringify(predictionResult));
  } catch (e) {
    response
      .status(500)
      .send(
        `get prediction failed with unknown error`
      );
  }
}
module.exports={
    getPrediction
}