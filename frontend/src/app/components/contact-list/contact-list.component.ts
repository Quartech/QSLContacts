import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core';
import { Contact } from '@app/models/contact';
import { saveAs } from 'file-saver/FileSaver';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactFilterPipe } from '../../pipes/contact-filter.pipe';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public allContacts: Array<Contact> = [];
  public displayedContacts: Array<Contact> = [];
  public filteredContacts: Array<Contact> = [];
  public loading: boolean;
  public searchString: string;

  public config = {
    increment: 10,
    displayLimit: 20,
    filterMessage: ''
  };

  private ContactFilterPipe: ContactFilterPipe;

  constructor(private api: ApiService, private spinner: NgxSpinnerService) {
    this.ContactFilterPipe = new ContactFilterPipe();
  }

  ngOnInit() {
    this.loading = true;
    this.spinner.show();

    // load contacts
    this.api.getContacts().subscribe(response => {
      this.allContacts = response.data.map(item => new Contact(item));
      this.resetFilteredContacts();
      this.resetDisplayedContacts();
      this.spinner.hide();
      this.loading = false;
    });
  }

  // convert contact to VCard and download
  getContactVCard(contact: Contact) {
    this.api
      .getContactVCard(contact)
      .subscribe(
        response => saveAs(new Blob([response.data], { type: 'text/x-vcard' }), `${contact.email}.vcf`),
        error => console.log(error)
      );
  }

  clearContactSearch() {
    this.searchString = '';
    this.config.displayLimit = 20;
    this.resetFilteredContacts();
    this.resetDisplayedContacts();
  }

  loadMore() {
    this.config.displayLimit += this.config.increment;
    this.filterDisplayedContacts();
  }

  filterContacts() {
    this.searchString = this.searchString.trim();
    if (this.searchString.length > 2) {
      this.filteredContacts = this.ContactFilterPipe.transform(this.allContacts, this.searchString);
      this.filterDisplayedContacts();
    } else {
      this.resetFilteredContacts();
      this.resetDisplayedContacts();
    }
  }

  resetFilteredContacts() {
    this.filteredContacts = this.allContacts;
  }

  resetDisplayedContacts() {
    this.displayedContacts = this.allContacts.slice(0, this.config.displayLimit);
  }

  filterDisplayedContacts() {
    this.displayedContacts = this.filteredContacts.slice(0, this.config.displayLimit);
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
