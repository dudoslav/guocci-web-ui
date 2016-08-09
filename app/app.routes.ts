import { provideRouter, RouterConfig } from '@angular/router';

import { InstancesComponent } from './instances.component';
import { InstanceCreateComponent } from './instance-create.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/instances',
    pathMatch: 'full'
  },
  {
    path: 'instances',
    component: InstancesComponent
  },
  {
    path: 'instances/create',
    component: InstanceCreateComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
