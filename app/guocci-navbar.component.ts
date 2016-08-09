import { Component, OnInit } from '@angular/core';

import { UserService } from './user/user.service';
import { User } from './user/user';

@Component({
    selector: 'guocci-navbar',
    templateUrl: 'app/guocci-navbar.component.html',
    providers: [ UserService ]
})
export class GuocciNavbarComponent implements OnInit {
    user: User;

    constructor(private userService: UserService) {

    }

    ngOnInit() {
        this.userService.getUser().then(user => this.user = user);
    }

}
