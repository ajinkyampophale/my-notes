const Joi = require('joi'),
  logger = reqlib('/helpers/logger'),
  {setErrorResponse} = reqlib('/helpers/response'),
  {validateApi, generateErrorText} = reqlib('/validation/common');

const validateCreate = async (req, res, next) => {
  try{
    const schema = Joi.object({
      title: Joi.string().min(2).max(50).required()
          .error(errors => generateErrorText(errors, 'Title')),
      description: Joi.string().min(2).max(500).required()
          .error(errors => generateErrorText(errors, 'Description'))
    });

    return validateApi(req, res, next, req.body, schema);
  }
  catch(err){
    logger.error('Notes create validation error => ', err);
    return setErrorResponse(res, next);
  }
}

const validateCreateMultiple = async (req, res, next) => {
  try{
    const schema = Joi.object({
      notesArray: Joi.array().items(
        Joi.object({
          title: Joi.string().min(2).max(50).required()
              .error(errors => generateErrorText(errors, 'Title')),
          description: Joi.string().min(2).max(500).required()
              .error(errors => generateErrorText(errors, 'Description'))
        })
      ).min(1).required()
    });

    return validateApi(req, res, next, req.body, schema);
  }
  catch(err){
    logger.error('Notes create multiple validation error => ', err);
    return setErrorResponse(res, next);
  }
}

const validateUpdate = async (req, res, next) => {
  try{
    const schema = Joi.object({
      title: Joi.string().min(2).max(50).required()
          .error(errors => generateErrorText(errors, 'Title')),
      description: Joi.string().min(2).max(500).required()
          .error(errors => generateErrorText(errors, 'Description')),
      notesId: Joi.string().required()
          .error(errors => generateErrorText(errors, 'Notes id'))
    });

    return validateApi(req, res, next, req.body, schema);
  }
  catch(err){
    logger.error('Notes update validation error => ', err);
    return setErrorResponse(res, next);
  }
}

const validateDelete = async (req, res, next) => {
  try{
    const schema = Joi.object({
      notesId: Joi.string().required()
          .error(errors => generateErrorText(errors, 'Notes id'))
    });

    return validateApi(req, res, next, req.body, schema);
  }
  catch(err){
    logger.error('Notes delete validation error => ', err);
    return setErrorResponse(res, next);
  }
}

module.exports = {
  validateCreate,
  validateCreateMultiple,
  validateUpdate,
  validateDelete
}