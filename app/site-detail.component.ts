import { Component, Input, OnInit } from '@angular/core';

import { Site } from './shared/site';
import { Instance } from './shared/instance';
import { Flavour } from './shared/flavour';
import { Appliance } from './shared/appliance';
import { GuocciService } from './shared/guocci.service';


@Component({
  selector: 'site-detail',
  templateUrl: 'app/site-detail.component.html',
  styles: [`
  .instance-detail-container {
    border: 2px solid #D5D5D5;
    cursor:pointer;
  }
  `]
})
export class SiteDetailComponent implements OnInit {
  @Input()
  site: Site;
  instances: Instance[];
  showDialog: boolean = false;
  selectedInstance: Instance;
  selectedInstanceFlavour: Flavour;
  selectedInstanceAppliance: Appliance;

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getInstancesOnSite(this.site.id)
      .subscribe(res => this.instances = res as Instance[]);
  }

  onInstanceSelect(instance: Instance) {
    this.guocciService.getAppliance(instance.applianceId)
      .subscribe(res => this.selectedInstanceAppliance = res);
    this.guocciService.getFlavourOnSiteForAppliance(instance.applianceId, this.site.id, instance.flavourId)
      .subscribe(res => this.selectedInstanceFlavour = res);
    this.selectedInstance = instance;
    this.showDialog = true;
  }

  deleteSelectedInstance() {
    this.guocciService.deleteInstanceOnSite(this.site.id, this.selectedInstance.id)
      .subscribe(res => this.instances.splice(this.instances.indexOf(this.selectedInstance), 1));
    this.showDialog = false;
  }

}
