import { Component, Output, EventEmitter } from '@angular/core';

import { Instance } from './shared/instance';
import { Site } from './shared/site';

@Component({
  selector: 'instance-delete-modal',
  templateUrl: 'app/instance-delete-modal.component.html',
  styles: [`
  .instance-delete-modal-text {
    margin: 5px;
  }
  `]
})
export class InstanceDeleteModalComponent {
  instance: Instance;
  site: Site;
  actions = new EventEmitter<string>();
  @Output()
  onDeleteConfirm = new EventEmitter();

  show(instance: Instance, site: Site) {
    this.instance = instance;
    this.site = site;
    this.actions.emit('openModal');
  }

  delete() {
    this.onDeleteConfirm.emit({ instance: this.instance, site: this.site });
    this.clear();
  }

  cancel() {
    this.clear();
  }

  clear() {
    this.instance = undefined;
    this.site = undefined;
  }
}
