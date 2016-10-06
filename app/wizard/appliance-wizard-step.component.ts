import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WizardStep } from './wizard-step';

import { Appliance } from '../shared/';

@Component({
  selector: 'appliance-wizard-step',
  templateUrl: 'app/wizard/appliance-wizard-step.component.html'
})
export class ApplianceWizardStep extends WizardStep {

  @Input()
  appliances: Appliance[];
  selectedAppliance: Appliance;
  @Output()
  onSelectAppliance = new EventEmitter();

  selectAppliance(appliance: Appliance) {
    this.selectedAppliance = appliance;
    this.onSelectAppliance.emit({ appliance: appliance });
  }

}
