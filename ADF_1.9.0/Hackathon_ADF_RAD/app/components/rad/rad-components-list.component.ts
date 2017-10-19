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

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'rad-component-list',
    templateUrl: './rad-components-list.component.html',
    styleUrls: ['./rad-components-list.component.scss']

})
export class RadComponentsListComponent implements OnInit {

    @Output()
    create: EventEmitter<string> = new EventEmitter<string>();

    components: any[];

    constructor() {}

    ngOnInit() {
        this.components = [
            {name: 'Tag List', type: 'TagListComponent'},
            {name: 'Document List', type: 'DocumentListComponent'},
            {name: 'AppsList', type: 'AppsListComponent'}
        ];
    }

    createComponent(name) {
        this.create.emit(name);
    }
}
