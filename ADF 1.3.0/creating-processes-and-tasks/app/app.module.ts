
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { LoginModule } from 'ng2-alfresco-login';
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { AppComponent } from './app.component';
import { routing } from './app.routes';

import {
  LoginDemoComponent,
  CreatingProcessesAndTasksPageComponent,
  AboutComponent,
  SettingComponent
} from './components/index';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        CoreModule.forRoot(),
        DataTableModule.forRoot(),
        LoginModule.forRoot(),
        ActivitiTaskListModule.forRoot(),
        ActivitiProcessListModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginDemoComponent,
        CreatingProcessesAndTasksPageComponent,
        AboutComponent,
        SettingComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
