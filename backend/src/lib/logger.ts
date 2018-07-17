import config from '../config/secrets';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;

interface LogSettings {
  file: string;
  level: string;
  console: boolean;
}

const createTransports = (config: LogSettings) => {
  const customTransports = [];

  // setup the file transport
  if (config.file) {

    // setup the log transport
    customTransports.push(
      new transports.File({
        filename: config.file,
        level: config.level
      })
    );
  }

  // if config.console is set to true, a console logger will be included.
  if (config.console) {
    customTransports.push(
      new transports.Console({
        level: config.level,
        format: combine(
          format.colorize(),
          format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        )
      })
    );
  }

  return customTransports;
};

const logger = createLogger({
  transports: createTransports(config.logging),
  format: combine(
    label({ label: config.app.name }),
    timestamp(),
    prettyPrint()
  )
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
