import { Component, Input } from '@angular/core';

import { Instance } from './site/instance';
import { Site } from './site/site';

import { SiteService } from './site/site.service';

@Component({
  selector: 'instance-detail',
  templateUrl: 'app/instance-detail.component.html',
  styles: [`
    .instance-detail-container {
      background-color: #FFFFFF;
    }
  `]
})
export class InstanceDetailComponent {
  @Input()
  instance: Instance;
  @Input()
  site: Site;

  constructor(private siteService: SiteService) {

  }

  doDelete() {
    this.siteService.deleteInstanceOnSite(this.site.id, this.instance.id)
      .subscribe(res => console.log(res));
  }
}
