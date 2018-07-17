import { Component, OnInit } from '@angular/core';
import { Contact } from '@app/models/contact';
import { ContactFilterPipe } from '../../pipes/contact-filter.pipe';
import { ApiService } from '@app/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public contacts: Array<Contact>;
  public searchString: String;
  public filteredContacts: number;

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
    this.contacts = new Array<Contact>();
    this.getContacts();
  }

  private getContacts() {
    this.api.getContacts().subscribe(response => {
      this.contacts = response.data.map(item => new Contact(item));
    });
  }

  getContactVCard(contact: Contact) {
    this.api
      .getContactVCard(contact)
      .subscribe(
        response => this.downloadVCard(contact, response.data),
        error => console.log(error)
      );
  }

  downloadVCard(contact: Contact, vcard: string) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard' }));
    a.download = `${contact.email}.vcf`;
    a.click();
    a.remove();
  }

  clearContactSearch() {
    this.searchString = '';
    this.config.displayLimit = 20;
  }

  loadMore() {
    this.config.displayLimit += this.config.increment;
  }

  getDisplayedElementCountMessage() {
    let items = this.contacts;
    if (this.contacts) {
      items = this.ContactFilterPipe.transform(items, this.searchString);
    }
    if (items.length > 0) {
      this.config.filterMessage = `Viewing ${Math.min(this.config.displayLimit, items.length)} of ${items.length} Results`;
    } else {
      this.config.filterMessage = 'No results found';
    }
    this.filteredContacts = items.length;
    return this.config.filterMessage;
  }
}
