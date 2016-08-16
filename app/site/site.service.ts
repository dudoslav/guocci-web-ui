import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Site } from './site';
import { Appliance } from './appliance';
import { Instance } from './instance';
import { Flavour } from './flavour';

@Injectable()
export class SiteService {
  private siteUrl: string;
  private sites: Observable<Site[]>;

  constructor(private http: Http, @Inject('webApiBaseUrl') private webApiBaseUrl: string) {
    this.siteUrl = `${this.webApiBaseUrl}/sites`;
  }

  getSites() {
    if (!this.sites) {
      this.sites = this.http.get(this.siteUrl)
        .map(res => res.json() as Site[]);
    }
    return this.sites;
  }

  getSite(id: number) {
    return this.http.get(this.siteUrl + '/' + id)
      .map(res => res.json() as Site);
  }

  getAppliancesOnSite(siteId: number) {
    return this.http.get(this.siteUrl + '/' + siteId + '/appliances')
      .map(res => res.json() as Appliance[]);
  }

  getApplianceOnSite(siteId: number, applianceId: number) {
    return this.http.get(`${this.siteUrl}/${siteId}/appliances/${applianceId}`).map(res => res.json() as Appliance);
  }

  getInstancesOnSite(siteId: number) {
    return this.http.get(this.siteUrl + '/' + siteId + '/instances')
      .map(res => res.json() as Instance[]);
  }

  createInstanceOnSite(siteId: number, instance: Instance) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post(this.siteUrl + '/' + siteId + '/instances', JSON.stringify(instance), { headers: headers })
      .map(res => res.json());
  }

  deleteInstanceOnSite(siteId: number, instanceId: number) {
    return this.http.delete(this.siteUrl + '/' + siteId + '/instances/' + instanceId);
  }

  getFlavoursOnSite(siteId: number) {
    return this.http.get(this.siteUrl + '/' + siteId + '/flavours')
      .map(res => res.json() as Flavour[]);
  }

  getFlavourOnSite(siteId: number, flavourId: number) {
    return this.http.get(`${this.siteUrl}/${siteId}/flavours/${flavourId}`).map(res => res.json() as Flavour);
  }

  getAppliancesAndFlavoursOnSite(siteId: number) {
    return Observable.forkJoin([ this.getAppliancesOnSite(siteId), this.getFlavoursOnSite(siteId) ]);
  }

}
