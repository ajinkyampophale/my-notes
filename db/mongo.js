'use strict';

const mongoose = require('mongoose'),
  config = require('config'),
  logger = reqlib('/helpers/logger');

class MongoDB {

  async connect(){

    try{

      if(!mongoose.connection.readyState){

        const mongoConfig = config.get('mongoDb'),
          {MONGO_URI, user, password, poolSize} = mongoConfig;
        
        const mongoOptions = {
          // user,
          // password,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          poolSize
        };

        mongoose.connect(MONGO_URI, mongoOptions);

        mongoose.connection.once('open', () => {
          logger.info("Mongo DB Connected Successfully.");
        });

        mongoose.connection.on('error', (err) => {
          logger.error('Mongo connection failed ', err);
          throw err;
        });

      }

      return true;

    }
    catch(err){
      logger.error('Mongo connection failed ', err);
      throw err;
    }

  }

}

module.exports = MongoDB;