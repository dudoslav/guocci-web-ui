import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from './user/user.service';
import { SiteService } from './site/site.service';

import { GuocciNavbarComponent } from './guocci-navbar.component';

@Component({
    selector: 'my-app',
    template: `<guocci-navbar></guocci-navbar>
    <router-outlet></router-outlet>`,
    directives: [ GuocciNavbarComponent, ROUTER_DIRECTIVES ],
    providers: [ SiteService, UserService ]
})
export class AppComponent { }
