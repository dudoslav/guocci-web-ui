import { Component, Input } from '@angular/core';

import { Instance } from './site/instance';

@Component({
  selector: 'instance-detail',
  templateUrl: 'app/instance-detail.component.html'
})
export class InstanceDetail {
  @Input()
  instance: Instance;
}
