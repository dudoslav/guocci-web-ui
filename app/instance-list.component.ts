import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';

import { Instance } from './shared/instance';
import { Site } from './shared/site';
import { GuocciService } from './shared/guocci.service';
import { InstanceDeleteModalComponent } from './instance-delete-modal.component';


@Component({
  selector: 'instance-list',
  templateUrl: 'app/instance-list.component.html',
  styles: [`
  .instance-detail-li {
    padding: 5px;
    margin: 20px 0px;
  }
  `]
})
export class InstanceListComponent implements OnInit {

  instancesData: [ Site, Instance ][];
  @ViewChild(InstanceDeleteModalComponent)
  private instanceDeleteModal: InstanceDeleteModalComponent;
  actions = new EventEmitter<string>();

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getAllInstances().subscribe(res => {
      this.getInstanceData(res[1], res[0] as Instance[][]);
      setTimeout(() => { this.actions.emit('showStaggeredList'); }, 100);
    });
  }

  getInstanceData(sites: Site[], instances: Instance[][]) {
    let result: [ Site, Instance ][] = [];
    instances.forEach((siteInstances, index) => {
      for (let i = 0; i < siteInstances.length; i++) {
        result.push([ sites[index], siteInstances[i] ]);
      }
    });
    let order = ['active', 'suspended', 'inactive'];
    result.sort((a, b) => {
      let nameA = a[1].name.toLowerCase();
      let nameB = b[1].name.toLowerCase();
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    });
    result.sort((a, b) => order.indexOf(a[1].state) - order.indexOf(b[1].state));
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
