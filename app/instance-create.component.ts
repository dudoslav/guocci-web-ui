import { Component, OnInit } from '@angular/core';

import { Site } from './site/site';
import { Appliance } from './site/appliance';
import { Instance } from './site/instance';
import { SiteService } from './site/site.service';

@Component({
  selector: 'instance-create',
  templateUrl: 'app/instance-create.component.html'
})
export class InstanceCreateComponent implements OnInit {
  sites: Site[];
  appliances: Appliance[];
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
    this.siteService.getAppliancesOnSite(this.selectedSite.id)
      .subscribe(appliances => this.appliances = appliances);
  }
}
