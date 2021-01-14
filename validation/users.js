const Joi = require('joi'),
  logger = reqlib('/helpers/logger'),
  {setErrorResponse} = reqlib('/helpers/response'),
  {validateApi, generateErrorText} = reqlib('/validation/common');

const validateLogin = async (req, res, next) => {

  try{

    const schema = Joi.object({
      email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
          .error(errors => generateErrorText(errors, 'Email')),
      password: Joi.string().min(8).max(50).required()
          .error(errors => generateErrorText(errors, 'Password'))
    });

    return validateApi(req, res, next, req.body, schema);

  }
  catch(err){
    logger.error('User login validation error => ', err);
    return setErrorResponse(res, next);
  }
}

const validateRegistration = async (req, res, next) => {

  try{

    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required()
          .error(errors => generateErrorText(errors, 'Name')),
      email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
          .error(errors => generateErrorText(errors, 'Email')),
      password: Joi.string().min(8).max(50).required()
          .error(errors => generateErrorText(errors, 'Password'))
    });

    return validateApi(req, res, next, req.body, schema);

  }
  catch(err){
    logger.error('User registration validation error => ', err);
    return setErrorResponse(res, next);
  }
}

module.exports = {
  validateLogin,
  validateRegistration
}