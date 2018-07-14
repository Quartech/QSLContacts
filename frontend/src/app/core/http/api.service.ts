import { Injectable } from '@angular/core';

import { ApiRequest } from '@app/core/http/http';

/**
 * API Service. Connects to server-side Rest API
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private api: ApiRequest) { }
}
