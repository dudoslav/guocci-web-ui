import { Component, OnInit } from '@angular/core';

import { Site } from './site/site';
import { Appliance } from './site/appliance';
import { Flavour } from './site/flavour';
import { Instance } from './site/instance';
import { SiteService } from './site/site.service';

@Component({
  selector: 'instance-create',
  templateUrl: 'app/instance-create.component.html'
})
export class InstanceCreateComponent implements OnInit {
  sites: Site[];
  appliances: Appliance[];
  flavours: Flavour[];
  model: Instance;
  selectedSite: Site;

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getSites()
      .subscribe(sites => { this.sites = sites; this.selectedSite = this.sites[0]; });
  }

  onSiteChange(value: Site) {
    this.appliances = undefined;
    this.siteService.getAppliancesAndFlavoursOnSite(this.selectedSite.id)
      .subscribe(res => { this.appliances = res[0]; this.flavours = res[1]; });
  }
}
