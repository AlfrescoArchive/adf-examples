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
 * distributed under the License is distributed on an "AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Input } from '@angular/core';
import { TextAnalyticsService } from './text-analysis.service';
import { AlfrescoApiService } from 'ng2-alfresco-core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'text-analysis',
    templateUrl: './text-analysis.component.html',
    styleUrls: ['./text-analysis.component.css']
})
export class TextAnalysisComponent {

    language: string;

    text: string;

    keyPhrases: any;

    sentiment: number;

    @Input()
    nodeId: string;

    constructor(private textAnalyticsService: TextAnalyticsService, private apiService: AlfrescoApiService) {
    }

    ngOnChanges(event) {
        this.clean();

        if (this.nodeId) {
            this.textAnalyticsService.getContentNode(this.nodeId).subscribe((data: any) => {
                this.text = data;
            });

            let obsLanguage = this.textAnalyticsService.detectLanguageByNodeId(this.nodeId);
            obsLanguage.subscribe((data) => {
                if (data._body) {
                    let parsedBody = JSON.parse(data._body);
                    if (parsedBody && parsedBody.documents && parsedBody.documents.length > 0) {
                        this.language = parsedBody.documents[0].detectedLanguages[0].name;
                    }
                }
            });

            let obsPhrase = this.textAnalyticsService.keyPhrasesByNodeId(this.nodeId);
            obsPhrase.subscribe((data) => {
                if (data._body) {
                    let parsedBody = JSON.parse(data._body);
                    if (parsedBody && parsedBody.documents && parsedBody.documents.length > 0) {
                        this.keyPhrases = parsedBody.documents[0].keyPhrases;
                    }
                }
            });

            let obsSentiment = this.textAnalyticsService.sentimentByNodeId(this.nodeId);
            obsSentiment.subscribe((data) => {
                if (data._body) {
                    let parsedBody = JSON.parse(data._body);
                    if (parsedBody && parsedBody.documents && parsedBody.documents.length > 0) {
                        this.sentiment = parsedBody.documents[0].score;
                    }
                }
            });

            Observable.forkJoin(obsLanguage, obsPhrase, obsSentiment).subscribe(() => {
                    this.textAnalyticsService.saveMetadata(this.language, this.keyPhrases, this.sentiment, this.nodeId);
                },
                (err) => {
                    console.log('Error: %s', err);
                });
        }
    }

    clean() {
        this.text = '';
        this.language = '';
        this.keyPhrases = [];
        this.sentiment = -1;
    }
}
