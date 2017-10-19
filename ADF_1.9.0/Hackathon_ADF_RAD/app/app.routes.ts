

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardEcm } from 'ng2-alfresco-core';

import {
  AboutComponent,
  LoginDemoComponent,
  SettingsComponent,
  RadComponent
} from './components/index';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

export const appRoutes: Routes = [

  { path: 'login', component: LoginDemoComponent},
  { path: 'settings', component: SettingsComponent },
  { path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: RadComponent, canActivate: [AuthGuardEcm]},
          {
            path: 'rad',
            component: RadComponent,
            canActivate: [AuthGuardEcm]
        },
          {path: 'about', component: AboutComponent}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
