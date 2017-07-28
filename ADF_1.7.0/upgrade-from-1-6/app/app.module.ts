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

import { AppConfigService, CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';

import { SearchModule } from 'ng2-alfresco-search';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { UploadModule } from 'ng2-alfresco-upload';
import { CreateFolderDialog } from './dialogs/create-folder.dialog';
import { MaterialModule } from './material.module';
  
import { TagModule } from 'ng2-alfresco-tag';
import { ActivitiFormModule } from 'ng2-activiti-form';

import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { AnalyticsModule } from 'ng2-activiti-analytics';
import { DiagramsModule } from 'ng2-activiti-diagrams';
  import { LoginModule } from 'ng2-alfresco-login';
import { UserInfoComponentModule } from 'ng2-alfresco-userinfo';
import { ViewerModule } from 'ng2-alfresco-viewer';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { DebugAppConfigService } from './services/debug-app-config.service';

import {
  HomeComponent,
  SettingComponent,
  FormDemoComponent,
  SearchComponent,
  SearchBarComponent,
  ActivitiDemoComponent,
  ActivitiShowDiagramComponent,
  ActivitiAppsView,
  FormViewer,
  FormNodeViewer,
  FilesComponent,
  AboutComponent,
  LoginDemoComponent
} from './components/index';

let appConfigFile = 'app.config-dev.json';
if (process.env.ENV === 'production') {
  appConfigFile = 'app.config-prod.json';
}

@NgModule({
    imports: [
        BrowserModule,
        routing,
        CoreModule.forRoot({
          appConfigFile: appConfigFile
        }),
        DataTableModule.forRoot(),
        SearchModule.forRoot(),
        
        DocumentListModule.forRoot(),
        MaterialModule,
        UploadModule.forRoot(),
        ViewerModule.forRoot(),
        ActivitiFormModule.forRoot(),
        
        ActivitiTaskListModule.forRoot(),
        ActivitiProcessListModule.forRoot(),
        AnalyticsModule.forRoot(),
        DiagramsModule.forRoot(), 
        LoginModule.forRoot(),
        UserInfoComponentModule.forRoot(),
        Editor3DModule.forRoot(),
        TagModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SearchBarComponent,
        SearchComponent,
        ActivitiDemoComponent,
        ActivitiAppsView,
        ActivitiShowDiagramComponent
        FormViewer,
        FormNodeViewer,
        FilesComponent,
        CreateFolderDialog,
        AboutComponent,
        LoginDemoComponent,
        SettingComponent,
        FormDemoComponent
    ],
    providers: [
        { provide: AppConfigService, useClass: DebugAppConfigService }
    ],
    bootstrap: [ AppComponent ]

    , entryComponents: [
      CreateFolderDialog
    ]
  
})
export class AppModule { }
