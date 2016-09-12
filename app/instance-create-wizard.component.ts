import { Component } from '@angular/core';

import { Instance } from './shared/instance';


@Component({
  selector: 'instance-create-wizard',
  templateUrl: 'app/instance-create-wizard.component.html',
  styles: [`
    .wizard-tab {
      text-align: center;
      border:1px solid #D5D5D5;
      padding: 30px 0px;
      margin: 0px;
      box-shadow: 0px 3px 1px #888888;
    }

    .wizard-tab-activated {
      background-color: #FFFFFF;
    }

    .wizard-tab-deactivated {
      background-color: #D5D5D5;
    }
  `]
})
export class InstanceCreateWizardComponent {
  instanceModel: Instance;


}
