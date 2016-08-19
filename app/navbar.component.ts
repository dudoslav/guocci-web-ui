import { Component, OnInit } from '@angular/core';

import { GuocciService } from './shared/guocci.service';
import { User } from './shared/user';

@Component({
    selector: 'guocci-navbar',
    templateUrl: 'app/navbar.component.html'
})
export class NavbarComponent implements OnInit {
    user: User;

    constructor(private guocciService: GuocciService) {

    }

    ngOnInit() {
        this.guocciService.getUser().subscribe(user => this.user = user);
    }

}
