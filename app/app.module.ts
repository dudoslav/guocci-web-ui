import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { ButtonModule,
  InputTextModule,
  SelectButtonModule,
  ListboxModule,
  DataListModule,
  ToolbarModule } from 'primeng/primeng';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { GuocciService } from './shared/guocci.service';
import { NavbarComponent } from './navbar.component';
import { InstanceListComponent } from './instance-list.component';
import { InstanceDetailComponent } from './instance-detail.component';
import { InstanceCreateComponent } from './instance-create.component';
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
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    ListboxModule,
    DataListModule,
    ToolbarModule,
    routing ],
  declarations: [ AppComponent,
    InstanceListComponent,
    InstanceDetailComponent,
    InstanceCreateComponent,
    NavbarComponent ],
  providers: [ GuocciService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RequestOptions, useClass: AppRequestOptions } ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
