/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AuthGuardBpm, AuthGuardEcm } from '@alfresco/adf-core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { StartProcessComponent } from './start-process/start-process.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'apps',
    component: AppsComponent,
    canActivate: [ AuthGuardBpm ]
  },
  {
    path: 'apps/:appId/tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardBpm ]
  },
  {
    path: 'apps/:appId/tasks/:taskId',
    component: TaskDetailsComponent,
    canActivate: [ AuthGuardBpm ]
  },
  {
    path: 'apps/:appId/start-process',
    component: StartProcessComponent,
    canActivate: [ AuthGuardBpm ]
  },
  {
    path: 'documentlist',
    component: DocumentlistComponent,
    canActivate: [ AuthGuardEcm ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
