import { Component, OnInit } from '@angular/core';
import { Contact } from '@app/models/contact';
import { ContactFilterPipe } from '../../pipes/contact-filter.pipe';
import { ApiService } from '@app/core';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public allContacts: Array<Contact> = [];
  public displayedContacts: Array<Contact> = [];
  public filteredContacts: Array<Contact> = [];

  public searchString: string;

  public config = {
    increment: 10,
    displayLimit: 20,
    filterMessage: ''
  };

  private ContactFilterPipe: ContactFilterPipe;

  constructor(private api: ApiService) {
    this.ContactFilterPipe = new ContactFilterPipe();
  }

  ngOnInit() {
    // load contacts
    this.api.getContacts().subscribe(response => {
      this.allContacts = response.data.map(item => new Contact(item));
      this.filteredContacts = this.allContacts;
      this.displayedContacts = this.allContacts.slice(0, this.config.displayLimit);
    });
  }

  // convert contact to VCard and download
  getContactVCard(contact: Contact) {
    this.api
      .getContactVCard(contact)
      .subscribe(
        response => saveAs(new Blob([response.data], { type: 'text/plain' }), `${contact.email}.vcf`),
        error => console.log(error)
      );
  }

  clearContactSearch() {
    this.searchString = '';
    this.config.displayLimit = 20;
    this.displayedContacts = this.allContacts.slice(0, this.config.displayLimit);
  }

  loadMore() {
    this.config.displayLimit += this.config.increment;
    this.displayedContacts = this.filteredContacts.slice(0, this.config.displayLimit);
  }

  filterContacts() {
    this.searchString = this.searchString.trim();
    if (this.searchString.length > 2) {
      this.filteredContacts = this.ContactFilterPipe.transform(this.allContacts, this.searchString);
      this.displayedContacts = this.filteredContacts.slice(0, this.config.displayLimit);
    } else {
      this.displayedContacts = this.allContacts.slice(0, this.config.displayLimit);
      this.filteredContacts = this.allContacts;
    }
  }

  getFilteredContactsCountMessage() {
    if (this.displayedContacts.length > 0) {
      this.config.filterMessage =
        `Viewing ${Math.min(this.config.displayLimit, this.filteredContacts.length)} of ${this.filteredContacts.length} Results`;
    } else {
      this.config.filterMessage = 'No results found';
    }
    return this.config.filterMessage;
  }
}
