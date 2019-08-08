const winston = require('winston');
const morgan = require('morgan');
require('winston-daily-rotate-file');


const logger = new winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: true,
            zippedArchive: true
        })
    ],
    exitOnError: false
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

module.exports = morgan("combined", { "stream": logger.stream });