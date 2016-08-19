import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { Site } from './site';
import { Appliance } from './appliance';
import { Instance } from './instance';
import { Flavour } from './flavour';
import { User } from './user';

@Injectable()
export class GuocciService {

  constructor(private http: Http) {

  }

  getUser() {
      return this.http.get(`/user`)
        .map(res => res.json() as User);
  }

  getSites() {
    return this.http.get(`/sites`)
      .map(res => res.json());
  }

  getAppliances() {
    return this.http.get(`/appliances`)
      .map(res => res.json() as Appliance[]);
  }

  getAppliance(applianceId: number) {
    return this.http.get(`/appliances/${applianceId}`)
      .map(res => res.json() as Appliance);
  }

  getSitesForAppliance(applianceId: number) {
    return this.http.get(`/appliances/${applianceId}/sites`)
      .map(res => res.json() as Site[]);
  }

  getSiteForAppliance(applianceId: number, siteId: number) {
    return this.http.get(`/appliances/${applianceId}/sites/${siteId}`)
      .map(res => res.json() as Site);
  }

  getFlavoursOnSiteForAppliance(applianceId: number, siteId: number) {
    return this.http.get(`/appliances/${applianceId}/sites/${siteId}/flavours`)
      .map(res => res.json() as Flavour[]);
  }

  getFlavourOnSiteForAppliance(applianceId: number, siteId: number, flavourId: number) {
    return this.http.get(`/appliances/${applianceId}/sites/${siteId}/flavours/${flavourId}`)
      .map(res => res.json() as Flavour);
  }

  getInstancesOnSite(siteId: number) {
    return this.http.get(`/sites/${siteId}/instances`)
      .map(res => res.json() as Instance[]);
  }

  createInstanceOnSite(siteId: number, instance: Instance) {
    return this.http.post(`/sites/${siteId}/instances`, JSON.stringify(instance))
      .map(res => res.json());
  }

  deleteInstanceOnSite(siteId: number, instanceId: number) {
    return this.http.delete(`/sites/${siteId}/instances/${instanceId}`)
      .map(res => res.json());
  }

}
