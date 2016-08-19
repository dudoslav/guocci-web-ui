import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Site } from './shared/site';
import { Appliance } from './shared/appliance';
import { Flavour } from './shared/flavour';
import { Instance } from './shared/instance';
import { Credential } from './shared/credential';
import { GuocciService } from './shared/guocci.service';

@Component({
  selector: 'instance-create',
  templateUrl: 'app/instance-create.component.html',
})
export class InstanceCreateComponent implements OnInit {
  sites: Site[];
  appliances: Appliance[];
  flavours: Flavour[];

  instanceForm: FormGroup;

  constructor(private guocciService: GuocciService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.instanceForm = this.formBuilder.group({
      appliance: ['', Validators.required],
      site: ['', Validators.required],
      flavour: ['', Validators.required],
      name: ['', Validators.required],
      key: ['', Validators.required]
    });

    this.guocciService.getAppliances()
      .subscribe(res => {
        this.appliances = res;
        this.instanceForm.controls['appliance'].valueChanges.subscribe(id => this.onApplianceChange(id));
        this.instanceForm.controls['site'].valueChanges.subscribe(id => this.onSiteChange(id));
      });
  }

  onApplianceChange(value: number) {
    this.sites = undefined;
    this.guocciService.getSitesForAppliance(value)
      .subscribe(res => this.sites = res);
  }

  onSiteChange(value: number) {
    this.flavours = undefined;
    this.guocciService.getFlavoursOnSiteForAppliance(this.instanceForm.controls['appliance'].value, value)
      .subscribe(res => this.flavours = res);
  }

  doSubmit() {
    let model: Instance = new Instance();
    model.name = this.instanceForm.value.name;
    model.applianceId = this.instanceForm.value.appliance;
    model.flavourId = this.instanceForm.value.flavour;

    let modelCredentials: Credential[] = [];
    modelCredentials.push(new Credential());
    modelCredentials[0].type = 'sshKey';
    modelCredentials[0].value = this.instanceForm.value.key;
    model.credentials = modelCredentials;

    this.guocciService.createInstanceOnSite(this.instanceForm.value.site, model)
    .subscribe(res => {
        this.goBack();
      },
      err => {
        alert(`Failed to create instance! ${err}`);
      });
  }

  goBack() {
    window.history.back();
  }
}
