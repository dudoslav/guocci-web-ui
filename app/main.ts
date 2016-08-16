import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, RequestOptions } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provide } from '@angular/core';

import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
  appRouterProviders,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  HTTP_PROVIDERS,
  provide('webApiBaseUrl', { useValue: 'https://guocci-mock-server.herokuapp.com/v1' })
]);
