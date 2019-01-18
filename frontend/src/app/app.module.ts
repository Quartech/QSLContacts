import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { ContactListComponent } from '@app/components/contact-list/contact-list.component';
import { CoreModule } from '@app/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ContactFilterPipe } from './pipes/contact-filter.pipe';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '**', redirectTo: 'contact-list'},
];

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
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
