import { Component, OnInit } from '@angular/core';

import { Site } from './site/site';
import { SiteService } from './site/site.service';


@Component({
  selector: 'instance-list',
  templateUrl: 'app/instance-list.component.html',
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
