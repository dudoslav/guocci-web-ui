import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, RequestOptions } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';


import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';
import { AppRequestOptions } from './app.request.options';

bootstrap(AppComponent, [
  appRouterProviders,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  HTTP_PROVIDERS,
  { provide: RequestOptions, useClass: AppRequestOptions },
  disableDeprecatedForms(),
  provideForms()
]);
