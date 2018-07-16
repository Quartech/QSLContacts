import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ApiService } from '@app/core';
import { FormsModule } from '@angular/forms';
import { ContactFilterPipe } from '@app/pipes/contact-filter.pipe';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: jasmine.createSpy('ApiService') }
      ],
      imports: [FormsModule],
      declarations: [AppComponent, ContactListComponent, ContactFilterPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'QSLContacts'`, async(() => {
    expect(component.title).toEqual('QSLContacts');
  }));
});
