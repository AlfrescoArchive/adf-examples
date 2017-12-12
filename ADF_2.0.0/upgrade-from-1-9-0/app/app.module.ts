

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Editor3DModule } from 'ng2-3d-editor';

import { AppConfigService, CoreModule, TRANSLATION_PROVIDER } from '@alfresco/adf-core';
import { DataTableModule } from '@alfresco/adf-core';
import { DebugAppConfigService } from './services/debug-app-config.service';

import { SearchModule } from '@alfresco/adf-content-services';
import { DocumentListModule } from '@alfresco/adf-content-services';
import { CustomSourcesComponent } from './components/files/custom-sources.component';

import { MaterialModule } from './material.module';
import { UploadModule } from '@alfresco/adf-content-services';
import { TagModule } from '@alfresco/adf-content-services';
import { FormModule } from '@alfresco/adf-core';

import { TaskListModule } from '@alfresco/adf-process-services';
import { ProcessListModule } from '@alfresco/adf-process-services';
import { AnalyticsModule } from '@alfresco/adf-insights';
import { DiagramsModule } from '@alfresco/adf-insights';
import { FormListDemoComponent } from './components/form/form-list-demo.component';
  import { LoginModule } from '@alfresco/adf-core';
import { UserInfoModule } from '@alfresco/adf-core';
import { ViewerModule } from '@alfresco/adf-core';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { ThemePickerModule } from './components/theme-picker/theme-picker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

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
        FormComponentModule,
        
        TaskListModule,
        ProcessListModule,
        AnalyticsModule,
        DiagramsModule, 
        LoginModule,
        FlexLayoutModule,
        UserInfoModule,
        Editor3DModule,
        TagModule,
        ThemePickerModule
    ],
    declarations: [
        AppLayoutComponent,
        AppComponent,
        HomeComponent,
        SearchBarComponent,
        SearchComponent,
        ActivitiDemoComponent,
        ActivitiTaskAttachmentsComponent,
        ActivitiProcessAttachmentsComponent,
        ActivitiAppsViewComponent,
        ActivitiShowDiagramComponent
        FormViewerComponent,
        FormListDemoComponent,
        FormNodeViewerComponent,
        FilesComponent,
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
})
export class AppModule { }
