import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '@app/core';
import { Contact } from '@app/models/contact';
import { saveAs } from 'file-saver/FileSaver';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactFilterPipe } from '../../pipes/contact-filter.pipe';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  public allContacts: Array<Contact> = [];
  public displayedContacts: Array<Contact> = [];
  public filteredContacts: Array<Contact> = [];
  public loading: boolean;
  public searchString: string;
  public routeSubscription: Subscription;

  private routerTypingTimer: any;
  private searchTypingTimer: any;

  public config = {
    increment: 10,
    displayLimit: 20,
    filterMessage: ''
  };

  private ContactFilterPipe: ContactFilterPipe;

  constructor(private api: ApiService, private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute) {
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
      this.routeSubscription = this.route.queryParams.subscribe(params => {
        this.searchString = params['search'] || '';
        this.filterContacts();
     });
      this.spinner.hide();
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  // convert contact to VCard and download
  getContactVCard(contact: Contact) {
    this.api
      .getContactVCard(contact)
      .subscribe(
        response => {
          if("download" in document.createElement("a")) {
            saveAs(new Blob([response.data], { type: 'text/x-vcard' }), `${contact.email}.vcf`);
          } else if (navigator.userAgent.match('CriOS')) {
            var reader = new FileReader();
            var out = new Blob([response.data], {type: 'text/x-vcard'});
            reader.onload = function(e){
              window.location.href = reader.result;
            }
            reader.readAsDataURL(out);
          } else {
            // Request the file directly using an anchor if the broswer does not support the download attribute.
            var link=document.createElement('a');
            link.href=`${environment.serverUrl}/api/v1/contactvcard?vcard=${encodeURI(JSON.stringify(contact))}`;
            link.setAttribute('download', '${contact.email}.vcf');
            link.click();
          }
        },
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
    clearTimeout(this.routerTypingTimer);
    clearTimeout(this.searchTypingTimer);
    if (this.searchString.length > 2) {
      //Do not change the route unless the user idles without typing for some time.
      this.routerTypingTimer = setTimeout(() => this.router.navigate([''], { queryParams: { search: this.searchString } }), 5000);

      //This should reduce some system overhead and make the typing feel smoother for fast typing (and in ie).
      this.searchTypingTimer = setTimeout(() => {
        this.filteredContacts = this.ContactFilterPipe.transform(this.allContacts, this.searchString);
        this.filterDisplayedContacts();
      }, 200);
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
