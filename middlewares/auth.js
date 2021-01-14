const fs = require('fs'),
  appRootPath = require('app-root-path'),
  jwt = require('jsonwebtoken'),
  logger = reqlib('/helpers/logger'),
  {setErrorResponse} = reqlib('/helpers/response');

const auth = (req, res, next) => {

  try{
    if(res.locals._notes.skipToLastMiddleware) return next();

    const accessToken = req.header('Authorization');

    if(!accessToken){
      return setErrorResponse(res, next, 'Auth token not present', 401);
    }
    
    // verify token 
    // get public key
    const publicKey = fs.readFileSync(appRootPath + '/keys/public.pem');
    
    jwt.verify(accessToken, publicKey, {algorithm: 'RS256'}, (err, decoded) => {

      if(err){
        logger.error('Invalid auth token => ', err);
        return setErrorResponse(res, next, 'Invalid auth token', 401);
      }

      const {_id, name, email} = decoded;

      res.locals._notes.user = {_id, name, email};
      return next();
    });

  }
  catch(err){
    logger.error('User auth error => ', err);
    return setErrorResponse(res, next);
  }   
}

module.exports = auth;