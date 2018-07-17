import NodeCache from 'node-cache';
import logger from './logger';
import config from '../config/secrets';

/**
 * Simple 2-level cache implementation that stores the contacts response
 * in a cache with a short ttl and an offline backup with a long ttl.
 */
export default class ResponseCache {
    private cache: NodeCache;
    private ttlSeconds: number = config.cache.cacheTtl;
    private checkInterval: number = config.cache.cacheInterval;
    private key = 'contacts';

    private offlineResponse: string;
    private static cacheInstance: ResponseCache;

    private constructor () {
        this.cache = new NodeCache ({ stdTTL: this.ttlSeconds });
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
    public setCachedResponse(response: string): void {
        if (!response) {
            throw(new TypeError('empty responses should not be cached.'));
        }
        this.cache.set(this.key, response, (err, success) => {
            if (err) {
                logger.error('failed to cache request with err: ' + err);
            } else if ( success ) {
                logger.info('caching request and storing for offline use.');
                this.offlineResponse = response;
            }
        });
    }

    /**
     * Get the cached contacts Json response.
     */
    public getCachedResponse(): string {
        const cached: string = this.cache.get(this.key);
        return cached;
    }

    /**
     * TODO: Consider using fs here.
     * Get the stored offline contacts Json response from memory.
     */
    public getOfflineResponse(): string {
        return this.offlineResponse;
    }
}