import './environment';  // Must be first
import config from './config/secrets';
import app from './app';
import logger from './lib/logger';
import { registerErrorHandler } from './lib/error-handler';

// ERROR HANDLING
// =============================================================================
registerErrorHandler(app);

// START THE SERVER
// =============================================================================
app.listen(config.app.port, () => {
  logger.info(`  ${app.name} ${config.app.version} listening on port ${config.app.port}`);
  logger.info('  Press CTRL-C to stop\n');
});
