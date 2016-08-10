import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UserService {
    private userUrl = 'https://guocci-mock-server.herokuapp.com/v1/user';

    constructor(private http: Http) {

    }

    /*private handleError(error: any) {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }*/

    getUser() {
      return this.http.get(this.userUrl)
        .map((res) => { return new User(res.json()); });
    }
}
