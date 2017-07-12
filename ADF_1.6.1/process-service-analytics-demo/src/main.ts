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
import { AnalyticsModule } from 'ng2-activiti-analytics';

@Component({
    selector: 'alfresco-app-demo',
    template: `
        <div *ngIf="!authenticated" style="color:#FF2323">
            Authentication failed to ip {{ host }} with user: admin@app.activiti.com, admin, you can still try to add a valid ticket to perform
            operations.
        </div>
        <hr>

        <div class="page-content">
            <label for="appId"><b>Insert the appId:</b></label><br>
            <input id="appId" size="10" type="text" [(ngModel)]="appId">
            <div class="mdl-grid">
                <div class="mdl-cell mdl-cell--4-col task-column mdl-shadow--2dp">
                    <analytics-report-list (reportClick)="onReportClick($event)"></analytics-report-list>
                </div>
                <div class="mdl-cell mdl-cell--8-col task-column mdl-shadow--2dp">
                    <activiti-analytics [appId]="appId" *ngIf="report" [reportId]="report.id"></activiti-analytics>
                </div>
            </div>
        </div>
    `
})

export class AnalyticsDemoComponent implements OnInit {

    appId: number;
    report: any;
    authenticated: boolean;

    constructor(private authService: AlfrescoAuthenticationService,
                private settingsService: AlfrescoSettingsService,
                private storage: StorageService,
                private logService: LogService) {
        settingsService.setProviders('BPM');
    }

    onReportClick(event: any) {
        this.report = event;
    }

    public ngOnInit(): void {
        this.login();
    }

    login() {
        this.authService.login('admin@app.activiti.com', 'admin').subscribe(
            ticket => {
                this.logService.log(ticket);
                this.authenticated = true;
            },
            error => {
                this.logService.error(error);
                this.authenticated = false;
            });
    }
}

@NgModule({
    imports: [
        BrowserModule,
        CoreModule.forRoot(),
        AnalyticsModule
    ],
    declarations: [AnalyticsDemoComponent],
    bootstrap: [AnalyticsDemoComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
