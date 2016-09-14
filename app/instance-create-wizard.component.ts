import { Component, OnInit } from '@angular/core';

import { Instance } from './shared/instance';
import { Site } from './shared/site';
import { Appliance } from './shared/appliance';
import { GuocciService } from './shared/guocci.service';


@Component({
  selector: 'instance-create-wizard',
  templateUrl: 'app/instance-create-wizard.component.html',
  styles: [`
  .select-list {
    cursor: pointer;
  }
  `]
})
export class InstanceCreateWizardComponent implements OnInit{
  appliances: Appliance[];
  selectedAppliance: Appliance;

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getAppliances().subscribe(res => this.appliances = res as Appliance[]);
  }

  onApplianceSelect(appliance: Appliance) {
    this.selectedAppliance = appliance;
  }

}
