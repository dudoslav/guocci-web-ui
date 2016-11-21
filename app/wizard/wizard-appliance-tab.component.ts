import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Appliance, GuocciService } from '../shared/index';

@Component({
  selector: 'wizard-appliance-tab',
  templateUrl: 'app/wizard/wizard-appliance-tab.component.html'
})
export class WizardApplianceTab implements OnInit {
  appliances: Appliance[];
  selected: Appliance;
  @Input()
  hidden: boolean;
  @Output()
  onSelect = new EventEmitter<Appliance>();

  constructor(private guocciService: GuocciService) {}

  ngOnInit() {
    this.guocciService.getAppliances().subscribe(res => this.appliances = res as Appliance[]);
  }

  select(appliance: Appliance) {
    this.selected = appliance;
    this.onSelect.emit(appliance);
  }

}
