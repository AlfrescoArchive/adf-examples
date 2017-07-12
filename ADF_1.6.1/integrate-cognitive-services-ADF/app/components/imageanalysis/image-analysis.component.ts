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

import { Component, Input } from '@angular/core';
import { ImageAnalyticsService } from './image-analysis.service';
import { TextAnalyticsService } from '../textanalysis/text-analysis.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'image-analysis',
    templateUrl: './image-analysis.component.html',
    styleUrls: ['./image-analysis.component.css']
})
export class ImageAnalysisComponent {

    language: string;

    text: string;

    keyPhrases: any;

    sentiment: number;

    @Input()
    nodeId: string;

    constructor(private textAnalyticsService: TextAnalyticsService, private imageAnalyticsService: ImageAnalyticsService) {
    }

    ngOnChanges() {
        this.clean();

        if (this.nodeId) {
            this.imageAnalyticsService.ocrRecognition(this.nodeId).subscribe((textContent) => {
                if (textContent) {
                    this.text = textContent;

                    let obsLanguage = this.textAnalyticsService.detectLanguage(textContent);
                    obsLanguage.subscribe((data) => {
                        if (data._body) {
                            let parsedBody = JSON.parse(data._body);
                            if (parsedBody && parsedBody.documents && parsedBody.documents.length > 0) {
                                this.language = parsedBody.documents[0].detectedLanguages[0].name;
                            }
                        }
                    });

                    let obsPhrase = this.textAnalyticsService.keyPhrases(textContent);
                    obsPhrase.subscribe((data) => {
                        if (data._body) {
                            let parsedBody = JSON.parse(data._body);
                            if (parsedBody && parsedBody.documents && parsedBody.documents.length > 0) {
                                this.keyPhrases = parsedBody.documents[0].keyPhrases;
                            }
                        }
                    });

                    let obsSentiment = this.textAnalyticsService.sentiment(textContent);
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
