import { Component, OnInit } from '@angular/core';

import { Site } from './site/site';
import { Appliance } from './site/appliance';
import { Flavour } from './site/flavour';
import { Instance } from './site/instance';
import { SiteService } from './site/site.service';
import { Credential } from './user/credential';

@Component({
  selector: 'instance-create',
  templateUrl: 'app/instance-create.component.html'
})
export class InstanceCreateComponent implements OnInit {
  sites: Site[];
  appliances: Appliance[];
  flavours: Flavour[];

  selectedSite: Site;
  selectedAppliance: Appliance;
  selectedFlavour: Flavour;
  selectedName: string;
  selectedSSHKey: string;

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getSites()
      .subscribe(sites => { this.sites = sites; this.selectedSite = this.sites[0]; });
  }

  onSiteChange(value: Site) {
    this.appliances = undefined;
    this.flavours = undefined;
    this.siteService.getAppliancesAndFlavoursOnSite(this.selectedSite.id)
      .subscribe(res => { this.appliances = res[0];
        this.flavours = res[1];
        this.selectedAppliance = this.appliances[0];
        this.selectedFlavour = this.flavours[0]; });
  }

  submit() {
    let model: Instance = new Instance();
    model.name = this.selectedName;
    model.applianceId = this.selectedAppliance.id;
    model.flavourId = this.selectedFlavour.id;
    let modelCredentials: Credential[] = [];
    modelCredentials.push(new Credential());
    modelCredentials[0].type = 'sshKey';
    modelCredentials[0].value = this.selectedSSHKey;
    model.credentials = modelCredentials;
    this.siteService.createInstanceOnSite(this.selectedSite.id, model).subscribe(res => console.log(res));
    this.goBack();
  }

  goBack() {
    window.history.back();
  }
}
