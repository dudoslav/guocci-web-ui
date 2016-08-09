import { Component } from '@angular/core';

import { GuocciNavbarComponent } from './guocci-navbar.component';

@Component({
    selector: 'my-app',
    template: '<guocci-navbar></guocci-navbar><h1>Welcome to Guocci</h1>',
    directives: [ GuocciNavbarComponent ]
})
export class AppComponent { }
