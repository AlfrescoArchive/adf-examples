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

import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppsListComponent } from 'ng2-activiti-tasklist';
import { AppConfigService } from 'ng2-alfresco-core';
import { DocumentListComponent } from 'ng2-alfresco-documentlist';
import { TagListComponent } from 'ng2-alfresco-tag';

@Component({
    selector: 'project-rad',
    templateUrl: './rad.component.html',
    styleUrls: ['./rad.component.scss']
})
export class RadComponent implements OnInit {

    @ViewChild('componentsContainer', {read: ViewContainerRef}) container;

    componentRefs = {};

    componentName: string = '';

    constructor(private resolver: ComponentFactoryResolver, private appConfig: AppConfigService) {
    }

    propertyChange(obj) {
        if (obj.component === 'DocumentListComponent') {
            this.appConfig.config['document-list'].presets.default = obj.config;
            this.createDocumentList('DocumentListComponent', obj.source);
        }

    }

    onComponentCreation(name) {
        this.componentName = name;

        if (name === 'TagListComponent') {
            if (this.componentRefs[name]) {
                this.componentRefs[name].destroy();
            }

            const tagListComponent: ComponentFactory<any> = this.resolver.resolveComponentFactory(TagListComponent);
            this.componentRefs[name] = this.container.createComponent(tagListComponent);
        }

        if (name === 'DocumentListComponent') {
            this.createDocumentList(name);
        }

        if (name === 'AppsListComponent') {
            const appsListComponent: ComponentFactory<any> = this.resolver.resolveComponentFactory(AppsListComponent);
            this.componentRefs[name] = this.container.createComponent(appsListComponent);
        }
    }

    createDocumentList(name, source = '-root-') {
        if (this.componentRefs[name]) {
            this.componentRefs[name].destroy();
        }

        const documentListComponent: ComponentFactory<any> = this.resolver.resolveComponentFactory(DocumentListComponent);
        this.componentRefs[name] = this.container.createComponent(documentListComponent);
        this.componentRefs[name].instance.currentFolderId = source;

        this.componentRefs[name].instance.ngOnInit();
        this.componentRefs[name].instance.ngOnChanges({ currentFolderId: { currentValue: source } });
    }

    ngOnInit() {
        console.log(this.container);
    }
}
