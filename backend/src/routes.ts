import restify from 'restify';
import { InternalServerError } from 'restify-errors';
import winston from 'winston';
import { Person, getBcGovPersonsFromXml } from './xmlToJson';
import getXml from './mockHttp';
import { createVCard } from './jsonToVcard';

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
    winston.debug('starting / request');
    // TODO: replace hardcoded url with env var.
    getXml('http://dir.gov.bc.ca/downloads/BCGOV_directory.xml', (err, data) => {
      if (err) {
        winston.error(err);
        res.send(new InternalServerError(err));
      }
      const persons: Array<Person> = getBcGovPersonsFromXml(data);
      res.send({ message: JSON.stringify(persons) });
      winston.debug('completed / request');
    });
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

  const contactVCard: restify.RequestHandler = (req, res, next) => {
    const vcard = createVCard(req.body);
    res.send(vcard.getFormattedString());
  };

  // TODO: add your route handlers here
  // ...

  // routes
  app.get('/', respondWith(index));
  app.get('/echo/:name', respondWith(echo));
  app.get('/health', respondWith(health));

  app.post('/contactvcard', respondWith(contactVCard));

  // TODO: add your routes here
  // ...
}
