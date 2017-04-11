
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardBpm } from 'ng2-alfresco-core';

import {
  LoginDemoComponent,
  TaskListPageComponent,
  AboutComponent,
  SettingComponent
} from './components/index';

export const appRoutes: Routes = [
  {path: 'login', component: LoginDemoComponent},
  {
    path: '',
    component: TaskListPageComponent,
    canActivate: [AuthGuardBpm]
  },  
  {path: 'about', component: AboutComponent},
  {path: 'settings', component: SettingComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
