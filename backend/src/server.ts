import './environment';  // Must be first
import config from './config/secrets';
import app from './app';
import { registerErrorHandler } from './lib/error-handler';
import winston from 'winston';

// ERROR HANDLING
// =============================================================================
registerErrorHandler(app);

// START THE SERVER
// =============================================================================
app.listen(config.app.port, () => {
  // TODO: refactor this into a logger file.
  winston.configure({
    format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    transports: [
      new winston.transports.Console({level: 'debug'})
    ]
  });
  console.log(`  ${app.name} ${config.app.version} listening on port ${config.app.port}`);
  console.log('  Press CTRL-C to stop\n');
});
