import { Component, Input, OnInit } from '@angular/core';

import { Site } from './shared/site';
import { Instance } from './shared/instance';
import { GuocciService } from './shared/guocci.service';


@Component({
  selector: 'site-detail',
  templateUrl: 'app/site-detail.component.html',
})
export class SiteDetailComponent implements OnInit {
  @Input()
  site: Site;
  instances: Instance[];

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getInstancesOnSite(this.site.id)
      .subscribe(res => this.instances = res as Instance[]);
  }

  onInstanceDeleted(event: any) {
    if (event.value) {
      this.ngOnInit();
    }
  }

}
