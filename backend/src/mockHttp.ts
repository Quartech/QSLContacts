import http from 'http';
import winston from 'winston';

export default function getXml(url, callback) {
  winston.debug('requesting xml from ministry');
  return http.get(url, function(res) {
    let xml: string = '';

    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, undefined);
    });

    res.on('timeout', function(e) {
      callback(e, undefined);
    });

    res.on('end', function() {
      winston.debug('finished retrieving xml from ministry');
      callback(undefined, xml);
    });
  });
}