
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { LoginModule } from 'ng2-alfresco-login';
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { AppComponent } from './app.component';
import { routing } from './app.routes';

import {
  LoginDemoComponent,
  TaskListPageComponent,
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
        ActivitiTaskListModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginDemoComponent,
        TaskListPageComponent,
        AboutComponent,
        SettingComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
