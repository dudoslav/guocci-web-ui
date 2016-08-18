import { Component, Input, OnInit } from '@angular/core';

import { Site } from './site/site';
import { Instance } from './site/instance';
import { SiteService } from './site/site.service';


@Component({
  selector: 'site-detail',
  templateUrl: 'app/site-detail.component.html',
})
export class SiteDetailComponent implements OnInit {
  @Input()
  site: Site;
  instances: Instance[];

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getInstancesOnSite(this.site.id)
      .subscribe(res => this.instances = res as Instance[]);
  }

}
