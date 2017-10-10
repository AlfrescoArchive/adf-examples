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

import { AppConfigService, CoreModule, TRANSLATION_PROVIDER } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { DebugAppConfigService } from './services/debug-app-config.service';

import { SearchModule } from 'ng2-alfresco-search';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { CreateFolderDialogComponent } from './dialogs/create-folder.dialog';
import { MaterialModule } from './material.module';
import { CustomSourcesComponent } from './components/files/custom-sources.component';
  

import { UploadModule } from 'ng2-alfresco-upload';
import { TagModule } from 'ng2-alfresco-tag';
import { ActivitiFormModule } from 'ng2-activiti-form';

import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { AnalyticsModule } from 'ng2-activiti-analytics';
import { DiagramsModule } from 'ng2-activiti-diagrams';
import { FormListDemoComponent } from './components/form/form-list-demo.component';
import { LoginModule } from 'ng2-alfresco-login';
import { UserInfoModule } from 'ng2-alfresco-userinfo';
import { ViewerModule } from 'ng2-alfresco-viewer';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { ThemePickerModule } from './components/theme-picker/theme-picker';

import {
  HomeComponent,
  SettingsComponent,
  FormDemoComponent,
  SearchComponent,
  SearchBarComponent,
  ActivitiDemoComponent,
  ActivitiTaskAttachmentsComponent,
  ActivitiProcessAttachmentsComponent,
  ActivitiShowDiagramComponent,
  ActivitiAppsViewComponent,
  FormViewerComponent,
  FormNodeViewerComponent,
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
        CoreModule,
        DataTableModule,
        SearchModule,
        DocumentListModule,
        MaterialModule,
        UploadModule,
        ViewerModule,
        ActivitiFormModule,
        ActivitiTaskListModule,
        ActivitiProcessListModule,
        AnalyticsModule,
        DiagramsModule, 
        LoginModule,
        UserInfoModule,
        Editor3DModule,
        TagModule,
        ThemePickerModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SearchBarComponent,
        SearchComponent,
        ActivitiDemoComponent,
        ActivitiTaskAttachmentsComponent,
        ActivitiProcessAttachmentsComponent,
        ActivitiAppsViewComponent,
        ActivitiShowDiagramComponent,
        FormViewerComponent,
        FormListDemoComponent,
        FormNodeViewerComponent,
        FilesComponent,
        CreateFolderDialogComponent,
        CustomSourcesComponent,
        AboutComponent,
        LoginDemoComponent,
          SettingsComponent,
        FormDemoComponent
    ],
    providers: [
      { provide: AppConfigService, useClass: DebugAppConfigService },
      {
        provide: TRANSLATION_PROVIDER,
        multi: true,
        useValue: {
          name: 'app',
          source: 'resources'
        }
      }
    ],
    bootstrap: [ AppComponent ]

    , entryComponents: [
    CreateFolderDialogComponent
    ]
  
})
export class AppModule { }
