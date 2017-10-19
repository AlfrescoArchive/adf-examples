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

import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'project-rad-inspector',
    templateUrl: './rad-inspector.component.html',
    styleUrls: ['./rad-inspector.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RadInspectorComponent implements OnChanges {

    @Output()
    changed: EventEmitter<object> = new EventEmitter<object>();

    @Input()
    actualComponent: string;

    @Input()
    titleToolbar: string;

    @Input()
    code: string = `[
    {
        "key": "$thumbnail",
        "type": "image",
        "srTitle": "ADF-DOCUMENT-LIST.LAYOUT.THUMBNAIL",
        "sortable": false
    },
    {
        "key": "name",
        "type": "text",
        "title": "ADF-DOCUMENT-LIST.LAYOUT.NAME",
        "cssClass": "full-width ellipsis-cell",
        "sortable": true
    },
    {
        "key": "content.sizeInBytes",
        "type": "fileSize",
        "title": "ADF-DOCUMENT-LIST.LAYOUT.SIZE",
        "sortable": true
    },
    {
        "key": "modifiedAt",
        "type": "date",
        "title": "ADF-DOCUMENT-LIST.LAYOUT.MODIFIED_ON",
        "format": "timeAgo",
        "sortable": true
    },
    {
        "key": "modifiedByUser.displayName",
        "type": "text",
        "title": "ADF-DOCUMENT-LIST.LAYOUT.MODIFIED_BY",
        "sortable": true
    }
]`;
    sources = [
        '-my-',
        '-root-',
        '-shared-'
    ];

    selectedSource: string = '-root-';

    config = {
        lineNumbers: true,
        mode: {
            name: 'javascript',
            json: true
        },
        theme: 'solarized dark'
    };

    onDocumentListPopertyChange() {
        this.emitChange('DocumentListComponent', {
            config: JSON.parse(this.code),
            source: this.selectedSource
        });
    }

    onToolbarComponentChange() {
        this.emitChange('ToolbarComponent', {title: this.titleToolbar});
    }

    emitChange(component, properties) {
        this.changed.emit(Object.assign({}, {component}, properties));
    }

    ngOnChanges() {
    }
}
