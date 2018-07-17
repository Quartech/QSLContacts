import { Injectable } from '@angular/core';

import { ApiRequest } from '@app/core/http/http';
import { Contact } from '@app/models/contact';

/**
 * API Service. Connects to server-side Rest API
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private api: ApiRequest) {}

  getContacts() {
    return this.api.get<ContactsResponse>('/api/v1/contacts');
  }

  getContactVCard(contact: Contact) {
    return this.api.post<ContactVCardResponse>('/api/v1/contactvcard', contact);
  }
}

interface ContactsResponse {
  data: Array<string>;
}

interface ContactVCardResponse {
  data: string;
}
