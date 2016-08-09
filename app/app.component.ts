import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { GuocciNavbarComponent } from './guocci-navbar.component';

@Component({
    selector: 'my-app',
    template: `<guocci-navbar></guocci-navbar>
    <h1>Welcome to Guocci</h1>
    <router-outlet></router-outlet>`,
    directives: [ GuocciNavbarComponent
    , ROUTER_DIRECTIVES ]
})
export class AppComponent { }
