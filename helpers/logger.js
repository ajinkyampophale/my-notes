const {createLogger, format, transports} = require('winston'),
  {combine, timestamp, label, printf} = format,
  DailyRotateFile = require('winston-daily-rotate-file'),
  appRootPath = require('app-root-path'),
  logDir = `${appRootPath}/logs/`;
 
const customFormat = printf(({ level, message, label, timestamp, stack }) => {
  return JSON.stringify({level, timestamp, label, message, stack});
});

const infoOpts = {
  filename:  logDir + 'info-%DATE%.log',
  level: 'info',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  zippedArchive: false
};

const errorOpts = {
  filename:  logDir + 'error-%DATE%.log',
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  zippedArchive: false
};

const logger = createLogger({
  format: combine(
    label({ label: 'My-notes!' }),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    customFormat
  ),
  transports: [
    new DailyRotateFile(infoOpts),
    new DailyRotateFile(errorOpts)
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

module.exports = logger;