
const setErrorResponse = (res, next, errorMsg = 'Internal server error', statusCode = 500, errorCode = 0) => {

  res.locals._notes.skipToLastMiddleware = true;
  res.locals._notes.response.error = true;
  res.locals._notes.response.message = errorMsg;
  res.locals._notes.response.errorCode = errorCode;
  res.locals._notes.statusCode = statusCode;
  next();
}

module.exports = {setErrorResponse};