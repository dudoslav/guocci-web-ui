import { Component, OnInit, ViewChild } from '@angular/core';

import { Instance } from './shared/instance';
import { Site } from './shared/site';
import { GuocciService } from './shared/guocci.service';
import { InstanceDeleteModalComponent } from './instance-delete-modal.component';


@Component({
  selector: 'instance-list',
  templateUrl: 'app/instance-list.component.html'
})
export class InstanceListComponent implements OnInit {

  instancesData: [ Site, Instance ][];
  @ViewChild(InstanceDeleteModalComponent)
  private instanceDeleteModal: InstanceDeleteModalComponent;

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getAllInstances().subscribe(res => {
      this.getInstanceData(res[1], res[0] as Instance[][]);
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
    this.instanceDeleteModal.show(request.instance, request.site);
  }

  onInstanceDeleteConfirm(event: any) {
    this.guocciService.deleteInstanceOnSite(event.site.id, event.instance.id)
      .subscribe(res => {
        this.ngOnInit();
      });
  }

}
