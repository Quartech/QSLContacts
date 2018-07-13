import restify from 'restify';

// wraps request handling code to ensure next() is always called at the end...
// this is a Restify requirement
// (see http://restify.com/docs/home/#using-next)
const respondWith = (callback: restify.RequestHandler): restify.RequestHandler => {
  return (req: restify.Request, res: restify.Response, next: restify.Next) => {
    callback.call(this, req, res, next);
    // ensure next() is always called
    return next();
  };
};

export function applyRoutes(app: restify.Server) {
  // route handlers
  const index: restify.RequestHandler = (req, res, next) => {
    res.send({ message: 'it works' });
  };
  const echo: restify.RequestHandler = (req, res, next) => {
    res.send(req.params);
  };
  const health: restify.RequestHandler = (req, res, next) => {
    res.send({
      app: {
        serviceID: `${app.name}`,
        message: 'Application is running',
        status: 'pass',
        uptime: Math.floor(process.uptime()),
      }
    });
  };

  // TODO: add your route handlers here
  // ...

  // routes
  app.get('/', respondWith(index));
  app.get('/echo/:name', respondWith(echo));
  app.get('/health', respondWith(health));

  // TODO: add your routes here
  // ...
}
