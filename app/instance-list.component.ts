import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Site } from './site/site';
import { SiteService } from './site/site.service';

import { SiteDetailComponent } from './site-detail.component';

@Component({
  selector: 'instance-list',
  templateUrl: 'app/instance-list.component.html',
  directives: [ SiteDetailComponent, ROUTER_DIRECTIVES ]
})
export class InstanceListComponent implements OnInit {

  sites: Site[];
  selectedSite: Site;

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getSites().subscribe(res => this.sites = res as Site[]);
  }

  onSelect(site: Site) {
    this.selectedSite = site;
  }

}
