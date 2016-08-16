import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UserService {
    private userUrl: string;

    constructor(private http: Http, @Inject('webApiBaseUrl') private webApiBaseUrl: string) {
      this.userUrl = `${this.webApiBaseUrl}/user`;
    }

    getUser() {
      return this.http.get(this.userUrl)
        .map(res => res.json() as User);
    }
}
