'use strict';

const express = require('express'),
  config = require('config'),
  app = express();

// set require function globally
global.reqlib = require('app-root-path').require;

const MongoDB = reqlib('/db/mongo'),
  logger = reqlib('/helpers/logger');

// parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended:false }));


// add locals to all middlewares
app.use('*', (req, res, next) => {

  res.locals._notes = {
    skipToLastMiddleware: false,
    response: {
      error: false,
      errorCode: 0,
      message: '',
      data: {}
    },
    statusCode: 200
  }
  next();
});


// Load all modules
app.use('/api/v1', require('./routes/v1/index'));


process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Date: ${Date.now()}, Unhandled Rejction: Reason =>  ${reason} , Promise => ${promise}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: Error => ', err);
  process.exit(1);
});

// run app
const PORT = config.get('PORT');
app.listen(PORT,  async () => {

  try{
    // connect to mongo db
    const MongoDbObj = new MongoDB();
    await MongoDbObj.connect();
    logger.info(`Listening on port ${PORT}`);
  }
  catch(err){
    logger.error('Some error occured ', err);
    process.exit(1);
  }

});