
import restify from 'restify';
import logger from './logger';

/**
 * Registers an error handler with the server
 * @param server {import('restify').Server}
 */
export function registerErrorHandler(server: restify.Server) {
  const httpStatusCodes = require('http-status');

  server.on('NotFound', (req, res) => {
    res.send(
      httpStatusCodes.NOT_FOUND,
      new Error('Method not Implemented')
    );
  });

  server.on('VersionNotAllowed', (req, res) => {
    res.send(
      httpStatusCodes.NOT_FOUND,
      new Error('Unsupported API version requested')
    );
  });

  server.on('InvalidVersion', (req, res) => {
    res.send(
      httpStatusCodes.NOT_FOUND,
      new Error('Unsupported API version requested')
    );
  });

  server.on('MethodNotAllowed', (req, res) => {
    res.send(
      httpStatusCodes.METHOD_NOT_ALLOWED,
      new Error('Method not Implemented')
    );
  });

  server.on('restifyError', (req, res, err) => {
    logger.error(err);
    res.send(httpStatusCodes.INTERNAL_SERVER_ERROR, err);
  });
}
