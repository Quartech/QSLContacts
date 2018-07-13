import { Component } from '@angular/core';
import { ApiService } from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QSLContacts';
  constructor(private api: ApiService) {}
}
