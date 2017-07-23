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

import { AppConfigService, CardViewUpdateService, CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { LoginModule } from 'ng2-alfresco-login';
import { SearchModule } from 'ng2-alfresco-search';
import { UploadModule } from 'ng2-alfresco-upload';
import { UserInfoComponentModule } from 'ng2-alfresco-userinfo';
import { ViewerModule } from 'ng2-alfresco-viewer';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { CreateFolderDialogComponent } from './dialogs/create-folder.dialog';
import { MaterialModule } from './material.module';

import {
    AboutComponent,
    FilesComponent,
    LoginDemoComponent,
    SearchBarComponent,
    SettingsComponent
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
        MaterialModule,
        LoginModule.forRoot(),
        SearchModule.forRoot(),
        DataTableModule.forRoot(),
        DocumentListModule.forRoot(),
        UploadModule.forRoot(),
        ViewerModule.forRoot(),
        UserInfoComponentModule.forRoot()
    ],
    declarations: [
        AppComponent,
        SearchBarComponent,
        LoginDemoComponent,
        AboutComponent,
        FilesComponent,
        CreateFolderDialogComponent,
        SettingsComponent
    ],
    providers: [
        CardViewUpdateService
    ],
    bootstrap: [ AppComponent ],
    entryComponents: [
        CreateFolderDialogComponent
    ]
})
export class AppModule { }
