const { log } = require("../Database/LogRepository");
const { getErrorText ,isErrorExists} = require("./ErrorProducer");
async function errorHandler(err, req, res, next) {
  try {
    await log(err);
  } catch (e) {
  }
  try {
    if (isErrorExists(err.message)) {
      const errText = getErrorText(err.message);
      res.status(400).send(errText);
      return;
    }
    response.status(500).send("SOMETHING_WENT_WRONG");
  } catch (err) {
    return res.status(500).send("SOMETHING_WENT_WRONG");
  }
}

module.exports = { errorHandler };
