import { Component, Input, OnInit } from '@angular/core';

import { Instance } from './site/instance';
import { Appliance } from './site/appliance';
import { Flavour } from './site/flavour';
import { Site } from './site/site';

import { SiteService } from './site/site.service';


@Component({
  selector: 'instance-detail',
  templateUrl: 'app/instance-detail.component.html'
})
export class InstanceDetailComponent implements OnInit {
  @Input()
  instance: Instance;
  @Input()
  site: Site;
  appliance: Appliance;
  flavour: Flavour;

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getApplianceOnSite(this.site.id, this.instance.applianceId).subscribe(res => this.appliance = res);
    this.siteService.getFlavourOnSite(this.site.id, this.instance.flavourId).subscribe(res => this.flavour = res);
  }

  doDelete() {
    this.siteService.deleteInstanceOnSite(this.site.id, this.instance.id)
      .subscribe(res => console.log(res));
  }
}
