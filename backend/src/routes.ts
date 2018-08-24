import axios from 'axios';
import restify from 'restify';
import { InternalServerError } from 'restify-errors';
import { Person, getBcGovPersonsFromXml } from './xmlToJson';
import logger from './lib/logger';
import config from './config/secrets';
import ResponseCache from './lib/cache';
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
        uptime: Math.floor(process.uptime())
      }
    });
  };

  const listContacts: restify.RequestHandler = (req, res, next) => {
    logger.debug('starting /contacts request');

    handleContactsJsonResponse()
      .then(persons => {
        res.send(persons);
        logger.debug('completed /contacts request');
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

  /**
   * Obtains the contacts Json response from the cache, or queries/converts the BCGOV xml.
   * @param callback will contain the data if processing is successful, else error.
   */
  function handleContactsJsonResponse(): Promise<Person[]> {
    const cachedResponse: Person[] = ResponseCache.getInstance().getCachedResponse();
    if (cachedResponse) {
      logger.debug('Returning cached contacts api response.');
      return Promise.resolve(cachedResponse);
    }

    return axios.get(config.app.apiUrl).then(handleContactsXml);
  }

  /**
   * Process the BCGOV xml response, or use offline data if processing fails.
   * @param xmlErr contains any errors returned when downloading the xml
   * @param xmlData the downloaded xml data
   * @param callback will contain the data if processing is successful, else error.
   */
  function handleContactsXml(xmlResponse): Person[] {
    const cache: ResponseCache = ResponseCache.getInstance();
    let xmlErr: string;
    if (xmlResponse && xmlResponse.data) {
      try {
        const persons: Person[] = getBcGovPersonsFromXml(xmlResponse.data);
        cache.setCachedResponse(persons);
        return persons;
      } catch (parseError) {
        xmlErr = parseError;
      }
    }
    logger.error('error retrieving BCGOV contacts: ' + xmlErr + ' Attempting to use offline data.');
    const offlineResponse = cache.getOfflineResponse();
    if (offlineResponse) {
      logger.info('Returning saved offline response as BCGOV xml could not be processed.');
      return offlineResponse;
    } else {
      throw new Error('No offline data available');
    }
  }

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
