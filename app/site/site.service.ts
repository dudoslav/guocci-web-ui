import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Site } from './site';

@Injectable()
export class SiteService {
  private siteUrl = 'https://guocci-mock-server.herokuapp.com/v1/sites';

  constructor(private http: Http) {

  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getSites(): Promise<Site[]> {
    return this.http.get(this.siteUrl)
      .toPromise()
      .then(response => response.json() as Site[])
      .catch(this.handleError);
  }

  getSite(id: number): Promise<Site> {
    return this.http.get(this.siteUrl + '/' + id)
      .toPromise()
      .then(response => response.json() as Site)
      .catch(this.handleError);
  }

}
