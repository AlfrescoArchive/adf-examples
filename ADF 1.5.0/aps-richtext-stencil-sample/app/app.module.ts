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


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Editor3DModule } from 'ng2-3d-editor';

import { CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';



import { TagModule } from 'ng2-alfresco-tag';
import { ActivitiFormModule } from 'ng2-activiti-form';
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { AnalyticsModule } from 'ng2-activiti-analytics';
import { LoginModule } from 'ng2-alfresco-login';
import { UserInfoComponentModule } from 'ng2-alfresco-userinfo';
import { ViewerModule } from 'ng2-alfresco-viewer';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { TinyEditorModule } from './components/customstencils/tiny-editor.component';


import {
  LoginDemoComponent,
  SettingComponent,
  MyTasksComponent,
  NewRequestComponent
} from './components/index';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        CoreModule.forRoot(),
        DataTableModule.forRoot(),
        TinyEditorModule,
        
        ViewerModule.forRoot(),
        ActivitiFormModule.forRoot(),
        ActivitiTaskListModule.forRoot(),
        ActivitiProcessListModule.forRoot(),
        AnalyticsModule.forRoot(),
        LoginModule.forRoot(),
        UserInfoComponentModule.forRoot(),
        Editor3DModule.forRoot(),
        TagModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginDemoComponent,
        SettingComponent,
        MyTasksComponent,
        NewRequestComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
