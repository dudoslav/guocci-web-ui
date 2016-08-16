import { provideRouter, RouterConfig } from '@angular/router';

import { InstanceListComponent } from './instance-list.component';
import { InstanceCreateComponent } from './instance-create.component';

export const routes: RouterConfig = [
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
    path: 'sites/instances/create',
    component: InstanceCreateComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
