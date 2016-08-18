import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'my-app',
    template: `<guocci-navbar></guocci-navbar>
    <router-outlet></router-outlet>`,
})
export class AppComponent {

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

 }
