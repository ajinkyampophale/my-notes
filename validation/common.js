const logger = reqlib('/helpers/logger'),
  {setErrorResponse} = reqlib('/helpers/response');

const validateApi = (req, res, next, requestBody, schema) => {

  try{
    const {error: joiError} = schema.validate(requestBody);

    // validation fails
    if(joiError){

      const joiErrorMsg = 
        (joiError.details && joiError.details.length > 0) ? joiError.details[0].message : joiError.message;

      const errorMsg = joiErrorMsg || 'Bad request';

      return setErrorResponse(res, next, errorMsg, 400);
    }

    return next();
  } 
  catch(err){
    logger.error('Validate API error => ', err);
    return setErrorResponse(res, next);
  }
}

// Generate common error text for JOI schema
const generateErrorText = (errors, label) => {
  errors.forEach(err => {
    switch (err.code) {
      case 'any.required':
        err.message = `${label} required`;
        break;
      case 'any.empty':
        err.message = `${label} cannot be empty`;
        break;
      case 'string.empty':
        err.message = `${label} cannot be empty`;
        break;
      case 'string.alphanum':
        err.message = `${label} should contain alphabet & numbers only`;
        break;
      case 'string.min':
        err.message = `${label} should have at least ${err.local.limit} characters`;
        break;
      case 'string.max':
        err.message = `${label} should have at most ${err.local.limit} characters`;
        break;
      case 'string.allow':
        err.message = `${label} is invalid`;
        break;
      case 'string.regex.base':
        err.message = `${label} is invalid`;
        break;
      case 'string.base':
        err.message = `${label} is invalid`;
        break;
      case 'any.allowOnly':
        err.message = `Values allowed in ${label.toLowerCase()} are ${customJoin(err.local.valids, ' or ')}`;
        break;
      case 'string.email':
        err.message = `${label} is invalid`;
        break;
      case 'number.base':
        err.message = `${label} is invalid`;
        break;
      case 'any.unknown':
        err.message = `Unknown field`;
        break;
      case 'string.length':
        err.message = `${label} should have ${err.local.limit} characters`;
        break;
      case 'number.integer':
        err.message = `${label} is invalid`;
        break;
      case 'string.ip':
        err.message = `${label} is invalid`;
        break;
      case 'date.strict':
        err.message = `${label} must be a valid date`;
        break;
      case 'date.format':
        err.message = `${label} is invalid. Valid date formats are ${err.local.format.join(' or ')}`;
        break;
      case 'number.greater':
        err.message = `${label} must be greater than ${err.local.limit}`;
        break;
      case 'object.missing':
        err.message = `${err.local.peers.join(' or ')} is required`;
        break;
      case 'array.base':
        err.message = `${label} must be an array`;
        break;
      case 'array.min':
        err.message = `${label} must contain at least 1 items`;
        break;
      case 'array.includesOne':
        err.message = `${label} is invalid`;
        break;
      case 'array.includesSingle':
        err.message = `${label} is invalid`;
        break;
      case 'array.unique':
        err.message = `${label} should be unique`;
        break;
      case 'string.hostname':
        err.message = `${label} must be a valid ip address or hostname`;
        break;
      case 'date.base':
        err.message = `${label} should be a valid date`;
        break;
      case 'date.min':
        err.message = `${label} should be a greater than ${formatDate(err.local.limit)}`;
        break;
      case 'date.greater':
        err.message = `${label} should be a greater than ${formatDate(err.local.limit)}`;
        break;
      case 'date.ref':
        err.message = `${label} references to ${err.local.ref} which is not a date`;
        break;
      case 'any.invalid':
        err.message = `${label} is invalid`;
        break;
      case 'number.min':
        err.message = `${label} must be larger than or equal to ${err.local.limit}`;
        break;
      case 'number.max':
        err.message = `${label} must be lesser than or equal to ${err.local.limit}`;
        break;
      case 'boolean.base':
        err.message = `${label} is invalid`;
        break;
      case 'alternatives.base':
        err.message = `${label} is invalid`;
        break;        
      default:
        break;
    }
  });

  return errors;
}

module.exports = {validateApi, generateErrorText};