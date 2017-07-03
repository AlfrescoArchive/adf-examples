
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardEcm } from 'ng2-alfresco-core';

import {
  LoginDemoComponent,
  ContentRepositoryComponent,
  AboutComponent,
  SettingComponent
} from './components/index';

export const appRoutes: Routes = [
  {path: 'login', component: LoginDemoComponent},
  {
    path: '',
    component: ContentRepositoryComponent,
    canActivate: [AuthGuardEcm]
  },  
  {path: 'about', component: AboutComponent},
  {path: 'settings', component: SettingComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
