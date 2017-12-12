import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DebugAppConfigService } from './services/debug-app-config.service';
import { MaterialModule } from './material.module';
import { CustomSourcesComponent } from './components/files/custom-sources.component';
import { FormListDemoComponent } from './components/form/form-list-demo.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { ThemePickerModule } from './components/theme-picker/theme-picker';
import { SearchResultComponent } from './components/search/search-result.component';
import { SearchBarComponent } from './components/search/search-bar.component';

import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule } from '@alfresco/adf-core';
import { InsightsModule } from '@alfresco/adf-insights';
import { AppConfigService, TRANSLATION_PROVIDER } from '@alfresco/adf-core';
import { TranslateService } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    HomeComponent,
    SettingsComponent,
    FormDemoComponent,
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
        MaterialModule,
        CoreModule,
        ContentModule,
        InsightsModule,
        ProcessModule,
        ThemePickerModule,
        FlexLayoutModule
    ],
    declarations: [
        AppLayoutComponent,
        AppComponent,
        HomeComponent,
        SearchBarComponent,
        SearchResultComponent,
        ActivitiDemoComponent,
        ActivitiTaskAttachmentsComponent,
        ActivitiProcessAttachmentsComponent,
        ActivitiAppsViewComponent,
        ActivitiShowDiagramComponent,
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
        TranslateService,
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
    bootstrap: [AppComponent]})export class AppModule {}
