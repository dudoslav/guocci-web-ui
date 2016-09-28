import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Instance } from './shared/instance';
import { Site } from './shared/site';
import { Appliance } from './shared/appliance';
import { Flavour } from './shared/flavour';
import { Credential } from './shared/credential';
import { GuocciService } from './shared/guocci.service';

declare var jQuery: any;


@Component({
  selector: 'instance-create-wizard',
  templateUrl: 'app/instance-create-wizard.component.html',
  styles: [`
  .select-list {
    cursor: pointer;
  }
  `]
})
export class InstanceCreateWizardComponent implements OnInit {
  appliances: Appliance[];
  sites: Site[];
  flavours: Flavour[];

  instanceForm: FormGroup;

  step = 0;

  constructor(private guocciService: GuocciService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.instanceForm = this.formBuilder.group({
      appliance: ['', Validators.required],
      site: ['', Validators.required],
      flavour: ['', Validators.required],
      name: ['', Validators.required],
      key: ['', Validators.required],
      userData: ['']
    });

    this.guocciService.getAppliances().subscribe(res => {
      this.appliances = res as Appliance[];
      this.instanceForm.controls['appliance'].valueChanges.subscribe(appliance => this.onApplianceChange(appliance));
      this.instanceForm.controls['site'].valueChanges.subscribe(site => this.onSiteChange(site));
    });
  }

  nextStep() {
    this.step++;
    jQuery(`.tab:nth-child(${this.step + 1})`).removeClass('disabled');
    jQuery('.tab > a')[this.step].click();
  }

  setStep(step: number) {
    if (this.step >= step || step === 3) {
      this.step = step;
    }
  }

  onApplianceChange(appliance: Appliance) {
    this.sites = undefined;
    this.instanceForm.controls['site'].reset();
    this.guocciService.getSitesForAppliance(appliance.id).subscribe(res => this.sites = res as Site[]);
  }

  onSiteChange(site: Site) {
    this.flavours = undefined;
    this.instanceForm.controls['flavour'].reset();
    if (this.instanceForm.value.site) {
      this.guocciService.getFlavoursOnSiteForAppliance(this.instanceForm.controls['appliance'].value.id, site.id)
        .subscribe(res => this.flavours = res as Flavour[]);
    }
  }

  doSubmit() {
    let model = new Instance();
    model.name = this.instanceForm.value.name;
    model.applianceId = this.instanceForm.value.appliance.id;
    model.flavourId = this.instanceForm.value.flavour.id;

    let modelCredentials: Credential[] = [];
    modelCredentials.push(new Credential());
    modelCredentials[0].type = 'sshKey';
    modelCredentials[0].value = this.instanceForm.value.key;
    model.credentials = modelCredentials;

    this.guocciService.createInstanceOnSite(this.instanceForm.value.site.id, model)
    .subscribe(res => {
        window.history.back();
      },
      err => {
        alert(`Failed to create instance! ${err}`);
      });
  }

}
