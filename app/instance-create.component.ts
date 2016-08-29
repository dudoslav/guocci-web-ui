import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

import { Instance } from './shared/instance';
import { Credential } from './shared/credential';
import { GuocciService } from './shared/guocci.service';

class MySelectItem implements SelectItem {
  label: string;
  value: any;
  instance: any;

  constructor(label: string, value: any, instance: any) {
    this.label = label;
    this.value = value;
    this.instance = instance;
  }
}

@Component({
  selector: 'instance-create',
  templateUrl: 'app/instance-create.component.html',
  styles: [`
    textarea {
      width: 100%;
    }
    .flavour-listbox-head {
      background-color: #FFFFFF;
    }
    .instance-form-container {
      background-color: rgba(0, 0, 0, 0.2);
    }
  `]
})
export class InstanceCreateComponent implements OnInit {
  appliances: SelectItem[];
  sites: SelectItem[];
  flavours: SelectItem[];

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
        this.appliances = [];
        res.forEach((appliance) => {
          this.appliances.push({ label: appliance.name, value: appliance.id });
        });
        this.instanceForm.controls['appliance'].valueChanges.subscribe(id => this.onApplianceChange(id));
        this.instanceForm.controls['site'].valueChanges.subscribe(id => this.onSiteChange(id));
      });
  }

  onApplianceChange(value: number) {
    this.sites = undefined;
    this.instanceForm.controls['site'].reset();
    this.guocciService.getSitesForAppliance(value)
      .subscribe(res => {
        this.sites = [];
        res.forEach(site => this.sites.push({ label: site.name, value: site.id }));
      });
  }

  onSiteChange(value: number) {
    this.flavours = undefined;
    this.instanceForm.controls['flavour'].reset();
    if (this.instanceForm.value.site) {
      this.guocciService.getFlavoursOnSiteForAppliance(this.instanceForm.controls['appliance'].value, value)
        .subscribe(res => {
          this.flavours = [];
          res.forEach(flavour => this.flavours.push(new MySelectItem(flavour.name, flavour.id, flavour)));
        });
    }
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
