import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';


import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { UserService } from './user/user.service';
import { SiteService } from './site/site.service';
import { GuocciNavbarComponent } from './guocci-navbar.component';
import { InstanceDetailComponent } from './instance-detail.component';
import { InstanceListComponent } from './instance-list.component';
import { InstanceCreateComponent } from './instance-create.component';
import { SiteDetailComponent } from './site-detail.component';
import { AppRequestOptions } from './app.request.options';


@NgModule({
  imports: [ BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, '/app/i18n', '.json'),
          deps: [Http]
        }),
    routing ],
  declarations: [ AppComponent,
    InstanceDetailComponent,
    InstanceListComponent,
    InstanceCreateComponent,
    SiteDetailComponent,
    GuocciNavbarComponent ],
  providers: [ UserService,
    SiteService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RequestOptions, useClass: AppRequestOptions } ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
