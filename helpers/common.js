const moment = require('moment'),
  CryptoJS = require('crypto-js'),
  config = require('config');


const formatDate = (date, format = 'YYYY-MM-DD') => {
  return moment(new Date(date)).format(format);
}

const encrypt = (message) => {
  const secretKey = config.get('secretKey');
  return CryptoJS.AES.encrypt(message, secretKey).toString();
}

const decrypt = (message) => {
  const secretKey = config.get('secretKey');
  return CryptoJS.AES.decrypt(message, secretKey).toString(CryptoJS.enc.Utf8);
}

const generateHash = (message) => {
  return CryptoJS.MD5(message).toString();
}

module.exports = {
  formatDate,
  encrypt,
  decrypt,
  generateHash
}