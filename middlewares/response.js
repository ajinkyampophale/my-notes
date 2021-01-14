
const sendResponse = (req, res, next) => {

  const {response, statusCode} = res.locals._notes;
  return res.status(statusCode).send(response);
}

module.exports = sendResponse;