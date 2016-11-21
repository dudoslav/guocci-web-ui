import { Component, OnChanges, Output, Input, EventEmitter, SimpleChange } from '@angular/core';

import { Flavour, Appliance, Site, GuocciService } from '../shared/index';

@Component({
  selector: 'wizard-flavour-tab',
  templateUrl: 'app/wizard/wizard-flavour-tab.component.html'
})
export class WizardFlavourTab implements OnChanges {
  flavours: Flavour[];
  selected: Flavour;
  @Input()
  hidden: boolean;
  @Input()
  appliance: Appliance;
  @Input()
  site: Site;
  @Output()
  onSelect = new EventEmitter<Flavour>();

  constructor(private guocciService: GuocciService) {}

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    if (changes['appliance'] !== undefined && this.appliance !== null) {
      this.flavours = undefined;
    } else if (changes['site'] !== undefined && this.site !== null && this.appliance !== null) {
      this.flavours = undefined;
      this.guocciService.getFlavoursOnSiteForAppliance(this.appliance.id, this.site.id)
          .subscribe(res => this.flavours = res as Flavour[]);
    }
  }

  select(flavour: Flavour) {
    this.selected = flavour;
    this.onSelect.emit(flavour);
  }

}
