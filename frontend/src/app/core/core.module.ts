import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

/* our own custom services  */
import { ApiRequest } from './http/http';
import { ApiService } from './http/api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    /* our own custom services  */
    ApiRequest,
    ApiService
  ]
})
export class CoreModule {
   /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
