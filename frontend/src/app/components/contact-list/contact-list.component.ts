import { Component, OnInit } from '@angular/core';
import { Contact } from '@app/models/contact';
import { ContactFilterPipe } from '../../pipes/contact-filter.pipe';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  public contacts: Array<Contact>;
  public searchString: String;

  private ContactFilterPipe: ContactFilterPipe;

  constructor() {
    this.ContactFilterPipe = new ContactFilterPipe();
  }

  ngOnInit() {
    this.contacts = new Array<Contact>();
    this.contacts.push(new Contact({
      name : 'Devin Smith',
      title : 'Devinist',
      email : 'devin.smith@quartech.com',
      phone: '123-456-7899',
      organization : 'Quartech'
    }));
    this.contacts.push(new Contact({
      name : 'Nick Phura',
      title : 'Phurist',
      email : 'nick.phura@quartech.com',
      phone: '123-789-5542',
      organization : 'Quartech'
    }));
    this.contacts.push(new Contact({
      name : 'Homer Simpson',
      title : 'Safet Officer',
      email : 'homer.simpson@fox.com',
      phone: '123-123-123x',
      organization : '20th Century Fox'
    }));
  }

  clearContactSearch() {
    this.searchString = '';
  }
}
