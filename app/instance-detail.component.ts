import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Instance } from './shared/instance';
import { Site } from './shared/site';
import { Flavour } from './shared/flavour';
import { Appliance } from './shared/appliance';
import { GuocciService } from './shared/guocci.service';


@Component({
  selector: 'instance-detail',
  templateUrl: 'app/instance-detail.component.html',
  styles: [`
  .instance-detail-li {
    border: 1px solid #D5D5D5;
    padding: 5px;
    margin: 20px 0px;
  }

  .instance-detail-row {
    margin-bottom: 0px;
  }

  .instance-detail-text {
    padding: 0px 5px;
  }
  `]
})
export class InstanceDetailComponent implements OnInit {

  @Input()
  instanceData: [ Site, Instance ];
  appliance: Appliance;
  flavour: Flavour;
  @Output()
  onInstanceDelete = new EventEmitter();

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getAppliance(this.instanceData[1].applianceId).subscribe(res => {
      this.appliance = res;
      this.guocciService.getFlavourOnSiteForAppliance(this.appliance.id, this.instanceData[0].id, this.instanceData[1].flavourId)
        .subscribe(res => this.flavour = res);
    });
  }

  doDelete() {
    this.onInstanceDelete.emit({ instanceId: this.instanceData[1].id, siteId: this.instanceData[0].id });
  }
}
