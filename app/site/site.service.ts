import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Site } from './site';
import { Appliance } from './appliance';
import { Instance } from './instance';

@Injectable()
export class SiteService {
  private siteUrl = 'https://guocci-mock-server.herokuapp.com/v1/sites';

  constructor(private http: Http) {

  }

  /*private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }*/

  getSites() {
    return this.http.get(this.siteUrl)
      .map(res => res.json() as Site[]);
  }

  getSite(id: number) {
    return this.http.get(this.siteUrl + '/' + id)
      .map(res => new Site(res.json()));
  }

  getAppliancesOnSite(siteId: number) {
    return this.http.get(this.siteUrl + '/' + siteId + '/appliances')
      .map(res => res.json() as Appliance[]);
  }

  getInstancesOnSite(siteId: number) {
    return this.http.get(this.siteUrl + '/' + siteId + '/instances')
      .map(res => res.json() as Instance[]);
  }

  getAllInstances() {
    return this.getSites()
      .flatMap((sites) => { return Observable.forkJoin(sites.map(site => this.getInstancesOnSite(site.id))); });
  }

}
