const express = require('express'),
  router = express.Router(),
  fs = require('fs'),
  jwt = require('jsonwebtoken'),
  appRootPath = require('app-root-path'),
  config = require('config'),
  logger = reqlib('/helpers/logger'),
  {setErrorResponse} = reqlib('/helpers/response'),
  sendResponse = reqlib('/middlewares/response'),
  users = reqlib('/models/users'),
  {generateHash} = reqlib('/helpers/common'),
  {validateLogin, validateRegistration} = reqlib('/validation/users');

router.post('/login', validateLogin, async (req, res, next) => {

  try{
    if(res.locals._notes.skipToLastMiddleware) return next();

    const {email, password} = req.body;

    // check if email exists
    const emailResult = await users.find({email});

    if(!emailResult || emailResult.length < 1){
      logger.error('Email id is invalid ', email);
      return setErrorResponse(res, next, 'Invalid email id', 400);
    }

    // check id email and password match
    const hashPassword = generateHash(password);
    const passwordResult = await users.find({email, password: hashPassword});

    if(!passwordResult || passwordResult.length < 1){
      logger.error('Password is invalid ', email);
      return setErrorResponse(res, next, 'Invalid password', 400);
    }

    // on success 
    const {_id, name} = passwordResult[0];

    // generate token 
    const privateKey = fs.readFileSync(appRootPath + '/keys/private.pem');

    // get expiry time
    const tokenExpiry = config.get('tokenExpiry') || '15m';

    const token = await jwt.sign(
      { _id, name, email }, 
      privateKey, 
      { algorithm: 'RS256', expiresIn: tokenExpiry}
    );

    // set token in headers
    res.header('X-Auth-Token', token);

    res.locals._notes.response.message = 'Login Successfull';
    res.locals._notes.response.data = {};
    return next();
  }
  catch(err){
    logger.error('User login error => ', err);
    return setErrorResponse(res, next);
  }

}, sendResponse);


router.post('/register', validateRegistration, async (req, res, next) => {

  try{
    if(res.locals._notes.skipToLastMiddleware) return next();

    const {name, email, password} = req.body;

    // check if email exists
    const emailResult = await users.find({email});

    if(emailResult && emailResult.length > 0){
      logger.error('Email id already exists', email);
      return setErrorResponse(res, next, 'Email id already exists', 400);
    }

    // generate password hash
    const hashPassword = generateHash(password);

    // create user
    const result = await users.create({
      name, email, password: hashPassword
    });

    res.locals._notes.response.message = 'Registered Successfull';
    res.locals._notes.response.data = result;
    return next();
  }
  catch(err){
    logger.error('User login error => ', err);
    return setErrorResponse(res, next);
  }

}, sendResponse);

module.exports = router;