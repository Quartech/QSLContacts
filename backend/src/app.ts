
// REQUIRE DEPENDENCIES
// =============================================================================
import restify from 'restify';
import versioning from 'restify-url-semver';
import corsMiddleware from 'restify-cors-middleware';
import formatter from './lib/jsend'; // json response formatter
import { applyRoutes } from './routes';

// LOAD APP CONFIGURATION
// =============================================================================
import config from './config/secrets';

// INITIALIZE SERVER
// =============================================================================
const app = restify.createServer({
  name: config.app.name,
  versions: [config.app.version],
  ignoreTrailingSlash: true,
  formatters: {
    'application/json': formatter
  }
});

// MIDDLEWARE
// =============================================================================

// enable url versioning (i.e. /api/v1/:your-routes/)
app.pre(restify.pre.dedupeSlashes());
app.pre(versioning({ prefix: '/api' }));

// request handling and parsing middleware
app.use(restify.plugins.acceptParser(app.acceptable));
app.use(restify.plugins.queryParser());
app.use(restify.plugins.bodyParser({
  mapParams: false,
  maxFileSize: 2 * 1024 * 1024 // 2MB
}));

// enable CORS
const cors = corsMiddleware({
  origins: ['*']
});
app.pre(cors.preflight);
app.use(cors.actual);

// TODO: enable gzip
// ...

// TODO: initialize validator for all requests
// ...

// SETUP ROUTES
// =============================================================================
applyRoutes(app);

export default app;
