import { Component, OnInit } from '@angular/core';

import { Instance } from './site/instance';
import { SiteService } from './site/site.service';

import { InstanceDetail } from './instance-detail.component';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'instance-list',
  templateUrl: 'app/instance-list.component.html',
  directives: [ InstanceDetail, RouterLink ]
})
export class InstanceListComponent implements OnInit {

  instances: Instance[];

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getAllInstances().subscribe(res => this.instances = res as Instance[]);
  }

}
