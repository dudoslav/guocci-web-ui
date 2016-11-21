import { Component, OnChanges, Output, Input, EventEmitter, SimpleChange } from '@angular/core';

import { Site, GuocciService, Appliance } from '../shared/index';

@Component({
  selector: 'wizard-site-tab',
  templateUrl: 'app/wizard/wizard-site-tab.component.html'
})
export class WizardSiteTab implements OnChanges {
  sites: Site[];
  selected: Site;
  @Input()
  hidden: boolean;
  @Input()
  appliance: Appliance;
  @Output()
  onSelect = new EventEmitter<Site>();

  constructor(private guocciService: GuocciService) {}

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    if (changes['appliance'] !== undefined && this.appliance !== null) {
      this.sites = undefined;
      this.guocciService.getSitesForAppliance(this.appliance.id).subscribe(res => this.sites = res as Site[]);
    }
  }

  select(site: Site) {
    this.selected = site;
    this.onSelect.emit(site);
  }

}
