import { provideRouter, RouterConfig } from '@angular/router';

import { InstanceListComponent } from './instance-list.component';
import { InstanceCreateComponent } from './instance-create.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/instances',
    pathMatch: 'full'
  },
  {
    path: 'instances',
    component: InstanceListComponent
  },
  {
    path: 'instances/create',
    component: InstanceCreateComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
