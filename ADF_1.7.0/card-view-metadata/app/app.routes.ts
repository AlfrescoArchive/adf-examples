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
import { AuthGuard, AuthGuardEcm } from 'ng2-alfresco-core';

import {
    AboutComponent,
    FilesComponent,
    LoginDemoComponent,
    SearchComponent,
    SettingsComponent
} from './components/index';

import { UploadButtonComponent } from 'ng2-alfresco-upload';

export const appRoutes: Routes = [
    { path: 'login', component: LoginDemoComponent },
    {
        path: '',
        component: FilesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'files',
        component: FilesComponent,
        canActivate: [AuthGuardEcm]
    },
    {
        path: 'files/:id',
        component: FilesComponent,
        canActivate: [AuthGuardEcm]
    },
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
