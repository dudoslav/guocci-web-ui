import { RouterModule, Routes } from '@angular/router';

import { InstanceListComponent } from './instance-list.component';
import { InstanceCreateWizardComponent } from './instance-create-wizard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/sites',
    pathMatch: 'full'
  },
  {
    path: 'sites',
    component: InstanceListComponent
  },
  {
    path: 'instances/create',
    component: InstanceCreateWizardComponent
  }
];

export const routing = RouterModule.forRoot(routes);
