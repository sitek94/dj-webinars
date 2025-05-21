import winston from 'winston';
import LokiTransport from 'winston-loki';

const { combine, timestamp, printf, json, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

console.log(process.env.LOKI_HOST);

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new LokiTransport({
      host: process.env.LOKI_HOST || 'http://localhost:3100',
      labels: { app: 'deliveroo-backend' },
      json: true,
      format: winston.format.json()
    }),
  ],
});

export default logger;
