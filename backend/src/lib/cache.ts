import NodeCache from 'node-cache';
import logger from './logger';
import config from '../config/secrets';
import axios from 'axios';
import { Person, getBcGovPersonsFromXml } from '../xmlToJson';
export interface Response {
    persons: Person[];
    lastModified: string;
    eTag: string;
  }

/**
 * Simple 2-level cache implementation that stores the contacts response
 * in a cache with a short ttl and an offline backup with a long ttl.
 */
export default class ResponseCache {
  private cache: NodeCache;
  private ttlSeconds: number = config.cache.cacheTtl;
  private checkInterval: number = config.cache.cacheInterval;
  private key = 'contacts';

    private offlineResponse: Response;
  private static cacheInstance: ResponseCache;

  private constructor() {
    this.cache = new NodeCache({ stdTTL: this.ttlSeconds, deleteOnExpire: false });
    this.cache.on('expired', this.renewCache);
  }

  public static getInstance(): ResponseCache {
    if (!ResponseCache.cacheInstance) {
      ResponseCache.cacheInstance = new ResponseCache();
    }
    return ResponseCache.cacheInstance;
  }

  /**
   * set the contacts response within the cache.
   * @param response
   */
    public setCachedResponse(persons: Person[], lastModified, eTag): void {
        if (!persons) {
      throw new TypeError('empty responses should not be cached.');
    }

        const response: Response = {
            persons: persons,
            lastModified: lastModified,
            eTag: eTag
        };

    this.cache.set(this.key, response, (err, success) => {
      if (err) {
        logger.error('failed to cache request with err: ' + err);
      } else if (success) {
        logger.info('caching request and storing for offline use.');
        this.offlineResponse = response;
      }
    });
  }

  /**
   * Get the cached contacts Json response.
   */
    public getCachedResponse(): Response {
        return this.cache.get(this.key);
  }

  /**
   * Fetches the bc gov data, parses into contacts, and sets the cache.
   */
  public renewCache(): void {
    axios
      .get(config.app.apiUrl)
      .then(xmlResponse => {
        if (xmlResponse && xmlResponse.data) {
          const persons: Person[] = getBcGovPersonsFromXml(xmlResponse.data);
          ResponseCache.cacheInstance.setCachedResponse(persons, xmlResponse.headers['last-modified'], xmlResponse.headers['etag']);
        }
      })
      .catch(error => {
        logger.error('Error auto-renewing cache: ' + error);
      });
  }

  /**
   * TODO: Consider using fs here.
   * Get the stored offline contacts Json response from memory.
   */
    public getOfflineResponse(): Response {
    return this.offlineResponse;
  }
}
