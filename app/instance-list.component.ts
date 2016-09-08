import { Component, OnInit } from '@angular/core';

import { Instance } from './shared/instance';
import { Site } from './shared/site';
import { GuocciService } from './shared/guocci.service';


@Component({
  selector: 'instance-list',
  templateUrl: 'app/instance-list.component.html',
  styles: [`
  .round-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  `]
})
export class InstanceListComponent implements OnInit {

  instancesData: [ Site, Instance ][];

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getAllInstances().subscribe(res => {
      this.getInstanceData(res[1], res[0]);
    });
  }

  getInstanceData(sites: Site[], instances: Instance[][]) {
    let result: [ Site, Instance ][] = [];
    instances.forEach((siteInstances, index) => {
      for (let i = 0; i < siteInstances.length; i++) {
        result.push([ sites[index], siteInstances[i] ]);
      }
    });
    this.instancesData = result;
  }

  onInstanceDeleteRequest(request: any) {
    this.guocciService.deleteInstanceOnSite(request.siteId, request.instanceId)
      .subscribe(res => this.ngOnInit());
  }

}
