import { Component, OnInit, Input, Output, EventEmitter, QueryList, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';

import { Instance } from './shared/instance';
import { Site } from './shared/site';
import { Flavour } from './shared/flavour';
import { Appliance } from './shared/appliance';
import { Interface } from './shared/interface';
import { GuocciService } from './shared/guocci.service';

declare var jQuery: any;

@Component({
  selector: '[instance-detail]',
  templateUrl: 'app/instance-detail.component.html',
  styles: [`
  .instance-detail-row {
    margin-bottom: 0px;
  }

  .instance-detail-text {
    padding: 0px 5px;
    margin: 0px;
    line-height: 1.2rem;
  }

  .instance-detail-icon {
    margin-left: 0px;
    margin-top: 0px;
    font-size: 5rem;
    width: 1em;
  }

  .instance-copy-icon {
    font-weight: bold;
    font-size: inherit;
    margin: 0px;
    width: 1em;
    height: 1em;
    display: inline-block;
    line-height: 1.2rem;
  }
  `]
})
export class InstanceDetailComponent implements OnInit, AfterViewInit {

  @Input()
  instanceData: [ Site, Instance ];
  appliance: Appliance;
  flavour: Flavour;
  interfaces: Interface[];
  @Output()
  onInstanceDelete = new EventEmitter();

  @ViewChildren('dontcollapse') dontCollapseElements: QueryList<ElementRef>;

  constructor(private guocciService: GuocciService) {

  }

  ngOnInit() {
    this.guocciService.getAppliance(this.instanceData[1].applianceId).subscribe(res => {
      this.appliance = res;
      this.guocciService.getFlavourOnSiteForAppliance(this.appliance.id, this.instanceData[0].id, this.instanceData[1].flavourId)
        .subscribe(res => this.flavour = res);
    });
    this.guocciService.getInterfacesOnSiteForInstance(this.instanceData[1].id, this.instanceData[0].id).
      subscribe(res => this.interfaces = res as Interface[]);
  }

  ngAfterViewInit() {
    this.dontCollapseElements.forEach( e => jQuery(e.nativeElement).on('click.collapse', (e:any) => e.stopPropagation()));
  }

  doDelete() {
    this.onInstanceDelete.emit({ instance: this.instanceData[1], site: this.instanceData[0] });
  }
}
