import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { MaterializeModule } from 'angular2-materialize/dist/materialize-module';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { GuocciService } from './shared/guocci.service';
import { MemoryPipe } from './memory.pipe';
import { NavbarComponent } from './navbar.component';
import { InstanceListComponent } from './instance-list.component';
import { InstanceDetailComponent } from './instance-detail.component';
import { InstanceDeleteModalComponent } from './instance-delete-modal.component';
import { InstanceCreateWizardComponent } from './instance-create-wizard.component';
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
    MaterializeModule,
    routing ],
  declarations: [ AppComponent,
    MemoryPipe,
    InstanceListComponent,
    InstanceDetailComponent,
    InstanceDeleteModalComponent,
    InstanceCreateWizardComponent,
    NavbarComponent ],
  providers: [ GuocciService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RequestOptions, useClass: AppRequestOptions } ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
