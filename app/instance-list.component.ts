import { Component, OnInit } from '@angular/core';

import { Instance } from './site/instance';

import { SiteService } from './site/site.service';

@Component({
  selector: 'instance-list',
  template: `<h1 *ngFor="let instance of instances">{{instance.name}}</h1>`
})
export class InstanceListComponent implements OnInit {

  instances: Instance[];

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getAllInstances().subscribe(res => console.log(res as Instance[]));
  }

}
