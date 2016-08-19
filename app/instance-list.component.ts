import { Component, OnInit } from '@angular/core';

import { Site } from './shared/site';
import { GuocciService } from './shared/guocci.service';


@Component({
  selector: 'instance-list',
  templateUrl: 'app/instance-list.component.html',
})
export class InstanceListComponent implements OnInit {

  sites: Site[];
  selectedSite: Site;

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getSites().subscribe(res => this.sites = res as Site[]);
  }

  onSelect(site: Site) {
    this.selectedSite = site;
  }

}
