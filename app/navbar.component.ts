import { Component, OnInit } from '@angular/core';

import { GuocciService } from './shared/guocci.service';
import { User } from './shared/user';

@Component({
    selector: 'guocci-navbar',
    templateUrl: 'app/navbar.component.html',
    styles: [`
    .guocci-navbar {
      padding: 0px 10px;
      margin-bottom: 50px;
    }
    .guocci-navbar-text {
      line-height: 2rem;
      height: 14px;
    }
    `]
})
export class NavbarComponent implements OnInit {
    user: User;

    constructor(private guocciService: GuocciService) {

    }

    ngOnInit() {
        this.guocciService.getUser().subscribe(user => this.user = user);
    }

}
