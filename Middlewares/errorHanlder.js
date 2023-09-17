const { log } = require("../Database/LogRepository");
const { getErrorText } = require("./ErrorProducer");
async function errorHandler(err, req, res, next) {
  try {
    await log(err);
  } catch (e) {
    console.log(e);
  }
  try {
    if (err.response.status == 400) {
      const errText = getErrorText(err.response.data.error);
      res.status(400).send(errText);
      return;
    }
    response.status(500).send("SOMETHING_WENT_WRONG");
  } catch (err) {
    return res.status(500).send("SOMETHING_WENT_WRONG");
  }
}

module.exports = { errorHandler };
