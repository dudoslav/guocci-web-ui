import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Site } from './site/site';
import { Appliance } from './site/appliance';
import { Flavour } from './site/flavour';
import { Instance } from './site/instance';
import { SiteService } from './site/site.service';
import { Credential } from './user/credential';

@Component({
  selector: 'instance-create',
  templateUrl: 'app/instance-create.component.html',
})
export class InstanceCreateComponent implements OnInit {
  sites: Site[];
  appliances: Appliance[];
  flavours: Flavour[];

  instanceForm: FormGroup;

  constructor(private siteService: SiteService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.instanceForm = this.formBuilder.group({
      site: ['', Validators.required],
      name: ['', Validators.required],
      key: ['', Validators.required],
      appliance: ['', Validators.required],
      flavour: ['', Validators.required]
    });

    this.siteService.getSites()
      .subscribe(sites => {
        this.sites = sites;
        this.instanceForm.controls['site'].valueChanges.subscribe(id => this.onSiteChange(id));
      });
  }

  onSiteChange(value: number) {
    this.appliances = undefined;
    this.flavours = undefined;
    this.siteService.getAppliancesAndFlavoursOnSite(value)
      .subscribe(res => {
        this.appliances = res[0];
        this.flavours = res[1];
      });
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

    this.siteService.createInstanceOnSite(this.instanceForm.value.site, model)
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
