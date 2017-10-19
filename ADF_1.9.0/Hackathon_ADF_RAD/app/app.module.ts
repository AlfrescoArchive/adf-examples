

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppConfigService, CoreModule, TRANSLATION_PROVIDER } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { DebugAppConfigService } from './services/debug-app-config.service';
import { DocumentListModule } from 'ng2-alfresco-documentlist';

import { MaterialModule } from './material.module';
import { TagModule } from 'ng2-alfresco-tag';
import { ActivitiFormModule } from 'ng2-activiti-form';
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { LoginModule } from 'ng2-alfresco-login';
import { ViewerModule } from 'ng2-alfresco-viewer';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { ThemePickerModule } from './components/theme-picker/theme-picker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { CodemirrorModule } from 'ng2-codemirror';

import { AppsListComponent } from 'ng2-activiti-tasklist';
import { DocumentListComponent } from 'ng2-alfresco-documentlist';
import { TagListComponent } from 'ng2-alfresco-tag';

import {
  SettingsComponent,
  AboutComponent,
  LoginDemoComponent,
  RadComponent,
  RadComponentsListComponent,
  RadInspectorComponent
} from './components/index';

let appConfigFile = 'app.config-dev.json';
if (process.env.ENV === 'production') {
  appConfigFile = 'app.config-prod.json';
}

@NgModule({
  entryComponents: [ TagListComponent, DocumentListComponent, AppsListComponent ],        
    imports: [
        BrowserModule,
        routing,
        CoreModule,
        DataTableModule,        
        DocumentListModule,
        MaterialModule,
        ViewerModule,
        ActivitiFormModule,
        ActivitiTaskListModule,
        ActivitiProcessListModule,
        LoginModule,
        FlexLayoutModule,
        TagModule,
        ThemePickerModule,
        CodemirrorModule       
    ],
    declarations: [
        AppLayoutComponent,
        AppComponent,
        RadComponent,
        RadComponentsListComponent,
        RadInspectorComponent,
        AboutComponent,
        LoginDemoComponent,
        SettingsComponent
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
