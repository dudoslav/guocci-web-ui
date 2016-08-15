import { Component, Input } from '@angular/core';

import { Instance } from './site/instance';

@Component({
  selector: 'instance-detail',
  templateUrl: 'app/instance-detail.component.html',
  styles: [`
    .instance-detail-container {
      background-color: #FFFFFF;
    }
  `]
})
export class InstanceDetailComponent {
  @Input()
  instance: Instance;
}
