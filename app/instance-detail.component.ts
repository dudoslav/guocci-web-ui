import { Component, Input, OnInit } from '@angular/core';

import { Instance } from './shared/instance';
import { Appliance } from './shared/appliance';
import { Flavour } from './shared/flavour';
import { Site } from './shared/site';

import { GuocciService } from './shared/guocci.service';


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

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getAppliance(this.instance.applianceId).subscribe(res => this.appliance = res);
    this.guocciService.getFlavourOnSiteForAppliance(this.instance.applianceId, this.site.id, this.instance.flavourId)
      .subscribe(res => this.flavour = res);
  }

  doDelete() {
    this.guocciService.deleteInstanceOnSite(this.site.id, this.instance.id)
      .subscribe(res => console.log(res));
  }
}
