
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { LoginModule } from 'ng2-alfresco-login';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { TagModule } from 'ng2-alfresco-tag';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { MaterialModule } from '@angular/material';

import {
  LoginDemoComponent,
  ContentRepositoryComponent,
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
        DocumentListModule.forRoot(),
        TagModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginDemoComponent,
        ContentRepositoryComponent,
        AboutComponent,
        SettingComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
