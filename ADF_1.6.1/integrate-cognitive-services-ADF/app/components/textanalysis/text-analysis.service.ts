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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LogService } from 'ng2-alfresco-core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlfrescoContentService } from 'ng2-alfresco-core';
import { AlfrescoApiService, AppConfigService } from 'ng2-alfresco-core';

/**
 * @returns {TextAnalyticsService}
 */
@Injectable()
export class TextAnalyticsService {

    key: String;

    urlService: String = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/';

    constructor(private  http: Http, private apiService: AlfrescoApiService, private logService: LogService, private appConfigService: AppConfigService, private alfrescoContentService: AlfrescoContentService) {
        this.key = <String>this.appConfigService.get('key');
        console.log(' this.key' + this.key);
    }

    getContentNode(nodeId) {
        return this.alfrescoContentService.getNodeContent(nodeId);
    }

    detectLanguageByNodeId(nodeId) {
        return new Observable<any>(observer => {
            this.getContentNode(nodeId).subscribe((dataContent) => {

                this.detectLanguage(dataContent).subscribe((language) => {
                    observer.next(language);
                    observer.complete();
                });
            });
        });
    }

    detectLanguage(dataContent) {
        return new Observable<any>(observer => {
            let headers = new Headers({'Ocp-Apim-Subscription-Key': this.key}); // ... Set content type to JSON
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({headers: headers}); // Create a request option

            let body = JSON.stringify(
                {
                    'documents': [
                        {
                            'id': '1',
                            'text': dataContent
                        }
                    ]
                }
            );

            this.http.post(`${this.urlService}languages?numberOfLanguagesToDetect=1`, body, options).subscribe((data) => {
                observer.next(data);
                observer.complete();
            }, (err) => {
                this.handleError(err);
            });
        });
    }

    keyPhrasesByNodeId(nodeId) {
        return new Observable<any>(observer => {
            this.getContentNode(nodeId).subscribe((dataContent) => {

                this.keyPhrases(dataContent).subscribe((keyPhrases) => {
                    observer.next(keyPhrases);
                    observer.complete();
                });
            });
        });
    }

    keyPhrases(dataContent) {
        return new Observable<any>(observer => {
            let headers = new Headers({'Ocp-Apim-Subscription-Key': this.key}); // ... Set content type to JSON
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({headers: headers}); // Create a request option

            let body = JSON.stringify(
                {
                    'documents': [
                        {
                            'id': '1',
                            'text': dataContent
                        }
                    ]
                }
            );

            this.http.post(`${this.urlService}keyPhrases`, body, options).subscribe((data) => {
                observer.next(data);
                observer.complete();
            }, (err) => {
                this.handleError(err);
            });
        });
    }

    sentimentByNodeId(nodeId) {
        return new Observable<any>(observer => {
            this.getContentNode(nodeId).subscribe((dataContent) => {

                this.sentiment(dataContent).subscribe((sentiment) => {
                    observer.next(sentiment);
                    observer.complete();
                });
            });
        });
    }

    sentiment(dataContent) {
        return new Observable<any>(observer => {
            let headers = new Headers({'Ocp-Apim-Subscription-Key': this.key}); // ... Set content type to JSON
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({headers: headers}); // Create a request option

            let body = JSON.stringify(
                {
                    'documents': [
                        {
                            'id': '1',
                            'text': dataContent
                        }
                    ]
                }
            );

            this.http.post(`${this.urlService}sentiment`, body, options).subscribe((data) => {
                observer.next(data);
                observer.complete();
            }, (err) => {
                this.handleError(err);
            });
        });
    }

    saveMetadata(language, keyPhrases, sentiment, nodeId) {
        let sentimentBoolean = sentiment >= 0.5;

        let properties = {
            'properties': {
                'mla:language': language,
                'mla:keyPhrases': JSON.stringify(keyPhrases),
                'mla:sentiment': sentimentBoolean,
                'cm:description': JSON.stringify(keyPhrases)
            }
        };

        this.apiService.getInstance().core.nodesApi.updateNode(nodeId, properties).then(function (data) {
            console.log('API called successfully. Returned data: ' + data);
        }, function (error) {
            console.error(error);
        });
    }

    private handleError(error: any) {
        this.logService.error(error);
        return Observable.throw(error || 'Server error');
    }
}
