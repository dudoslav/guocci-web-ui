import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Instance, Site, Appliance, Flavour, Credential, GuocciService } from './shared/index';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'instance-create-wizard',
  templateUrl: 'app/instance-create-wizard.component.html',
  styles: [`
  .select-list {
    cursor: pointer;
  }

  .disable-list-item:not(.active):hover {
    opacity: 1.0;
    box-shadow: none;
    background-color: #FFFFFF !important;
    cursor: default;
  }

  .detail-overview {
    margin: 0.5em 0;
    padding: 0.5em 0.5em;
  }

  .detail-overview.row {
    padding: 0;
  }
  `]
})
export class InstanceCreateWizardComponent implements OnInit {
  appliances: Appliance[];
  sites: Site[];
  flavours: Flavour[];
  credentials: Credential[];

  instanceForm: FormGroup;
  key = "";

  step = 0;

  constructor(private guocciService: GuocciService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.instanceForm = this.formBuilder.group({
      appliance: ['', Validators.required],
      site: ['', Validators.required],
      flavour: ['', Validators.required],
      name: ['', Validators.required],
      credential: ['', Validators.required],
      userData: ['']
    });

    this.guocciService.getAppliances().subscribe(res => {
      this.appliances = res as Appliance[];
      this.instanceForm.controls['appliance'].valueChanges.subscribe(appliance => this.onApplianceChange(appliance));
      this.instanceForm.controls['site'].valueChanges.subscribe(site => this.onSiteChange(site));
    });

    this.guocciService.getUserCredentials().subscribe(res => this.credentials = res as Credential[]);
  }

  nextStep() {
    this.step++;
    jQuery(`.tab:nth-child(${this.step + 1})`).removeClass('disabled');
    jQuery('.tab > a')[this.step].click();
  }

  setStep(step: number, event: any) {
    if (event.target.className.indexOf('disabled') === -1) {
      this.step = step;
    }
  }

  setKey(key: string) {
    this.key = key;
    let modelCredential: Credential = new Credential();
    modelCredential.type = 'sshKey';
    modelCredential.value = key;
    this.instanceForm.controls['credential'].setValue(modelCredential);
  }

  setCredential(credential: Credential) {
    if (this.key.length == 0) {
      this.instanceForm.controls['credential'].setValue(credential);
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
    model.credentials = [this.instanceForm.value.credential];
    
    this.guocciService.createInstanceOnSite(this.instanceForm.value.site.id, model)
    .subscribe(res => {
        window.history.back();
        Materialize.toast('Created instance', 4000);
      },
      err => {
        Materialize.toast(`Failed to create instance! ${err}`, 4000);
      });
  }

}
