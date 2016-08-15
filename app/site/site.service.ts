import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Site } from './site';
import { Appliance } from './appliance';
import { Instance } from './instance';
import { Flavour } from './flavour';

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
      .map(res => res.json() as Site);
  }

  getAppliancesOnSite(siteId: number) {
    return this.http.get(this.siteUrl + '/' + siteId + '/appliances')
      .map(res => res.json() as Appliance[]);
  }

  getInstancesOnSite(siteId: number) {
    return this.http.get(this.siteUrl + '/' + siteId + '/instances')
      .map(res => res.json() as Instance[]);
  }

  createInstanceOnSite(siteId: number, instance: Instance) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.siteUrl + '/' + siteId + '/instances', JSON.stringify(instance), { headers: headers })
      .map(res => res.json());
  }

  deleteInstanceOnSite(siteId: number, instanceId: number) {
    return this.http
      .delete(this.siteUrl + '/' + siteId + '/instances/' + instanceId)
      .map(res => res.json());
  }

  getFlavoursOnSite(siteId: number) {
    return this.http.get(this.siteUrl + '/' + siteId + '/flavours')
      .map(res => res.json() as Flavour[]);
  }

  getAppliancesAndFlavoursOnSite(siteId: number) {
    return Observable.forkJoin([ this.getAppliancesOnSite(siteId), this.getFlavoursOnSite(siteId) ]);
  }

  /*getAllInstances() {
    return this.getSites()
      .flatMap((sites) => {
        let data: [Site[], any] = [null, null];
        data[0] = sites;
        data[1] = Observable.forkJoin(
          sites.map(site => this.getInstancesOnSite(site.id))
          , Observable.of(sites)
          );
        return data;
        }).map((data) => {
          console.log(data);
        });
  }*/

}
