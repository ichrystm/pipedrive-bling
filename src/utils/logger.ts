import winston from 'winston';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.prettyPrint(),
  transports: [new winston.transports.Console({ handleExceptions: true })],
});

export default logger;
