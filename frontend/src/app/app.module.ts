import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@app/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '@app/app.component';
import { ContactListComponent } from '@app/components/contact-list/contact-list.component';
import { ContactFilterPipe } from './pipes/contact-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
