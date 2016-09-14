import { Component, OnInit } from '@angular/core';

import { Instance } from './shared/instance';
import { Site } from './shared/site';
import { Appliance } from './shared/appliance';
import { Flavour } from './shared/flavour';
import { GuocciService } from './shared/guocci.service';


@Component({
  selector: 'instance-create-wizard',
  templateUrl: 'app/instance-create-wizard.component.html',
  styles: [`
  .select-list {
    cursor: pointer;
  }
  `]
})
export class InstanceCreateWizardComponent implements OnInit{
  appliances: Appliance[];
  selectedAppliance: Appliance;
  sites: Site[];
  selectedSite: Site;
  flavours: Flavour[];
  selectedFlavour: Flavour;

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getAppliances().subscribe(res => this.appliances = res as Appliance[]);
  }

  onApplianceSelect(appliance: Appliance) {
    this.guocciService.getSitesForAppliance(appliance.id).subscribe(res => this.sites = res as Site[]);
    this.selectedAppliance = appliance;
    this.selectedSite = undefined;
    this.selectedFlavour = undefined;
  }

  onSiteSelect(site: Site) {
    this.guocciService.getFlavoursOnSiteForAppliance(this.selectedAppliance.id, site.id).subscribe(res => this.flavours = res as Flavour[]);
    this.selectedSite = site;
    this.selectedFlavour = undefined;
  }

  onFlavourSelect(flavour: Flavour) {
    this.selectedFlavour = flavour;
  }

}
