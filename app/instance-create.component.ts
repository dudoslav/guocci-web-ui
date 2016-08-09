import { Component, OnInit } from '@angular/core';

import { Site } from './site/site';
import { SiteService } from './site/site.service'

@Component({
  selector: 'instance-create',
  templateUrl: 'app/instance-create.component.html',
  providers: [ SiteService ]
})
export class InstanceCreateComponent implements OnInit {
  sites: Site[];

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getSites().then(sites => this.sites = sites);
  }
}
