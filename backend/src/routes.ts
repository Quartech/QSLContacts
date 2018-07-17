import axios from 'axios';
import restify from 'restify';
import { InternalServerError } from 'restify-errors';
import { Person, getBcGovPersonsFromXml } from './xmlToJson';
import logger from './lib/logger';
import config from './config/secrets';
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
    res.send({
      message: 'Welcome to QSL Contacts application.'
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

  const listContacts: restify.RequestHandler = (req, res, next) => {
    logger.debug('starting / request');

    axios.get(config.app.apiUrl)
      .then(response => {
        const xml = response.data;
        const persons: Person[] = getBcGovPersonsFromXml(xml);
        res.send(persons);
        logger.debug('completed / request');
      })
      .catch(err => {
        logger.error(err);
        res.send(new InternalServerError(err));
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
  app.get('/contacts', respondWith(listContacts));

  app.post('/contactvcard', respondWith(contactVCard));

  // TODO: add your routes here
  // ...
}
