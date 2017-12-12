

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardEcm, AuthGuardBpm } from '@alfresco/adf-core';

import {
  AboutComponent,
  HomeComponent,
  SearchComponent,
 FilesComponent,
 ActivitiDemoComponent,
  ActivitiShowDiagramComponent,
  ActivitiAppsViewComponent,
  FormViewerComponent,    
  FormNodeViewerComponent,
  LoginDemoComponent,
  SettingsComponent,
  FormDemoComponent
} from './components/index';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

 import { FormListDemoComponent } from './components/form/form-list-demo.component';
 import { CustomSourcesComponent } from './components/files/custom-sources.component';

export const appRoutes: Routes = [

  { path: 'login', component: LoginDemoComponent},
  { path: 'settings', component: SettingsComponent },
  { path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: HomeComponent, canActivate: [AuthGuard]},
          {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
        
          {path: 'files', component: FilesComponent, canActivate: [AuthGuardEcm]},
          {path: 'files/:id', component: FilesComponent, canActivate: [AuthGuardEcm]},
          {path: 'dl-custom-sources',component: CustomSourcesComponent, canActivate: [AuthGuardEcm]},
        
          {path: 'search', component: SearchComponent, canActivate: [AuthGuardEcm]},
        
          {path: 'activiti', component: ActivitiAppsViewComponent, canActivate: [AuthGuardBpm]},
          {path: 'activiti/apps', component: ActivitiAppsViewComponent, canActivate: [AuthGuardBpm]},
          {path: 'activiti/apps/:appId/tasks', component: ActivitiDemoComponent, canActivate: [AuthGuardBpm]},
          {path: 'activiti/diagram/:processDefinitionId',  component: ActivitiShowDiagramComponent, canActivate: [AuthGuardBpm]},
          {path: 'activiti/appId/:appId', component: ActivitiDemoComponent, canActivate: [AuthGuardBpm]},
          {path: 'activiti/tasksnode/:id', component: FormNodeViewerComponent, canActivate: [AuthGuardBpm]},
          {path: 'form-list', component: FormListDemoComponent},
          {
            path: 'activiti/tasks/:id',
            component: FormViewerComponent,
            canActivate: [AuthGuardBpm]
          },
          
          {path: 'about', component: AboutComponent},
          {path: 'form', component: FormDemoComponent}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
