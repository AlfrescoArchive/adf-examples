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

import { NgModule, Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CoreModule, AlfrescoSettingsService, AlfrescoAuthenticationService, StorageService, LogService } from 'ng2-alfresco-core';
import { DataTableModule }  from 'ng2-alfresco-datatable';
import { WebScriptModule } from 'ng2-alfresco-webscript';

@Component({
    selector: 'alfresco-app-demo',
    template: `
                  <div *ngIf="!authenticated" style="color:#FF2323">
                    Authentication failed to ip {{ ecmHost }} with user: admin, admin, you can still try to add a valid ticket to perform
                    operations.
               </div>
               <hr>
                <label for="scriptPath"><b>Insert a scriptPath</b></label><br>
                <input id="scriptPath" type="text" size="48"  [(ngModel)]="scriptPath"><br>
                <label for="contextRoot"><b>Insert a contextRoot</b></label><br>
                <input id="contextRoot" type="text" size="48"  [(ngModel)]="contextRoot"><br>
                <label for="servicePath"><b>Insert a servicePath</b></label><br>
                <input id="servicePath" type="text" size="48"  [(ngModel)]="servicePath"><br>
        <div class="container" *ngIf="authenticated">
            <alfresco-webscript-get [scriptPath]="scriptPath"
                           [scriptArgs]="scriptArgs"
                           [contextRoot]="contextRoot"
                           [servicePath]="servicePath"
                           [contentType]="'HTML'"
                           (onSuccess)= "logData($event)"></alfresco-webscript-get>
        </div>
    `
})
class WebscriptDemo implements OnInit {

    currentPath: string = '/';
    authenticated: boolean;
    scriptPath: string = 'sample/folder/Company%20Home';
    contextRoot: string = 'alfresco';
    servicePath: string = 'service';
    scriptArgs: string = '';

    constructor(private authService: AlfrescoAuthenticationService,
                private settingsService: AlfrescoSettingsService,
                private storage: StorageService,
                private logService: LogService) {

        settingsService.setProviders('ECM');
    }

    ngOnInit() {
        this.login();
    }

    login() {
        this.authService.login('admin', 'admin').subscribe(
            ticket => {
                this.logService.info(ticket);
                this.authenticated = true;
            },
            error => {
                this.logService.error(error);
                this.authenticated = false;
            });
    }

    logData(data) {
        this.logService.info(data);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        CoreModule.forRoot(),
        DataTableModule,
        WebScriptModule
    ],
    declarations: [ WebscriptDemo ],
    bootstrap:    [ WebscriptDemo ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
