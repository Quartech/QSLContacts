import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

// keep separate API_BASE_URL for production and development...
// (see https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/application-environments.md)
const API_BASE_URL = environment.serverUrl;

function isAbsoluteUrl(url: string): boolean {
  const absolutePattern = /^https?:\/\//i;
  return absolutePattern.test(url);
}

function removeDoubleSlashes(url: string): string {
  return url.replace(/([^:]\/)\/+/g, '$1');
}

export function buildApiPath(pathOrUrl: string): string {
  const url = isAbsoluteUrl(pathOrUrl) ? pathOrUrl : `${API_BASE_URL}/${pathOrUrl}`;
  return removeDoubleSlashes(url);
}

interface HttpClientOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

/**
 * Perform HTTP requests to the backend REST API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiRequest {

  constructor(private http: HttpClient) { }

  /**
   * Construct a GET request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  get<T>(path: string, options?: HttpClientOptions) {
    const url = buildApiPath(path);
    return this.http.get<T>(url, options);
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  post<T>(path: string, body: any | null, options?: HttpClientOptions) {
    const url = buildApiPath(path);
    return this.http.post<T>(url, body, options);
  }

  /**
   * Construct a PUT request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  put<T>(path: string, body: any | null, options?: HttpClientOptions) {
    const url = buildApiPath(path);
    return this.http.put<T>(url, body, options);
  }

  /**
   * Construct a DELETE request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  delete<T>(path: string, options?: HttpClientOptions) {
    const url = buildApiPath(path);
    return this.http.delete<T>(url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  head<T>(path: string, options?: HttpClientOptions): Observable<T> {
    const url = buildApiPath(path);
    return this.http.head<T>(url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  options<T>(path: string, options?: HttpClientOptions) {
    const url = buildApiPath(path);
    return this.http.options<T>(url, options);
  }
}
