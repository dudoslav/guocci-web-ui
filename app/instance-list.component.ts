import { Component, OnInit } from '@angular/core';

import { Instance } from './site/instance';
import { Site } from './site/site';
import { SiteService } from './site/site.service';

import { SiteDetailComponent } from './site-detail.component';

@Component({
  selector: 'instance-list',
  templateUrl: 'app/instance-list.component.html',
  directives: [ SiteDetailComponent ]
})
export class InstanceListComponent implements OnInit {

  sites: Site[];

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getSites().subscribe(res => this.sites = res as Site[]);
  }

  deleteInstance(instance: Instance) {
    //this.siteService.deleteInstanceOnSite();
  }

}
