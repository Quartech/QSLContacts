import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from '@app/components/contact-list/contact-list.component';
import { Contact } from '@app/models/contact';
import { ApiService } from '@app/core';
import { ContactFilterPipe } from '@app/pipes/contact-filter.pipe';
import { FormsModule } from '@angular/forms';
import { environment } from '@env/environment';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ContactListComponent, ContactFilterPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('calls getContacts()', () => {
      const contactsRequest = httpMock.expectOne({
        method: 'get',
        url: `${environment.serverUrl}/contacts`
      });
      contactsRequest.flush([{ title: 'some contact title' }]);

      expect(component.contacts.length).toEqual(1);
      expect(component.contacts[0]).toEqual(
        new Contact({ title: 'some contact title' })
      );
      httpMock.verify();
    });
  });
});
