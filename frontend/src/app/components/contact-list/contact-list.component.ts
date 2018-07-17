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
  private ContactFilterPipe: ContactFilterPipe;

  constructor(private api: ApiService) {
    this.ContactFilterPipe = new ContactFilterPipe();
  }

  ngOnInit() {
    this.contacts = new Array<Contact>();
    this.getContacts();
  }

  private getContacts() {
    this.api
      .getContacts()
      .subscribe(
        response => (this.contacts = response.map(item => new Contact(item)))
      );
  }

  getContactVCard(contact: Contact) {
    this.api
      .getContactVCard(contact)
      .subscribe(
        response => this.downloadVCard(response.data),
        error => console.log(error)
      );
  }

  downloadVCard(vcard: string) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard' }));
    a.download = 'vcard.vcf';
    a.click();
    a.remove();
  }

  clearContactSearch() {
    this.searchString = '';
  }
}
