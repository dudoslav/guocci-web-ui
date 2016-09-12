import { RouterModule, Routes } from '@angular/router';

import { InstanceListComponent } from './instance-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/sites',
    pathMatch: 'full'
  },
  {
    path: 'sites',
    component: InstanceListComponent
  }
];

export const routing = RouterModule.forRoot(routes);
