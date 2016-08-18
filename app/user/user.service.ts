import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UserService {
    private userUrl: string = '/user';

    constructor(private http: Http) {

    }

    getUser() {
      return this.http.get(this.userUrl)
        .map(res => res.json() as User);
    }
}
