/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LogService } from 'ng2-alfresco-core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlfrescoApiService, AppConfigService} from 'ng2-alfresco-core';

/**
 * @returns {ImageAnalyticsService}
 */
@Injectable()
export class ImageAnalyticsService {

    key: String;

    urlService: String = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk&detectOrientation=true';

    constructor(private  http: Http, private apiService: AlfrescoApiService, private logService: LogService, private appConfigService: AppConfigService) {
        this.key = <String>this.appConfigService.get('key');
    }

    getContentNode(nodeId) {
        return new Observable<any>(observer => {
            this.convertBlob(this.apiService.getInstance().content.getContentUrl(nodeId)).subscribe((data) => {
                observer.next(data);
            });
        });
    }

    ocrRecognition(nodeId) {
        return new Observable<any>(observer => {

            this.getContentNode(nodeId).subscribe((blob) => {
                let headers = new Headers({'Ocp-Apim-Subscription-Key': this.key}); // ... Set content type to JSON
                headers.append('Content-Type', 'application/octet-stream');
                let options = new RequestOptions({headers: headers}); // Create a request option

                this.http.post(`${this.urlService}`, blob, options).subscribe((data: any) => {
                    observer.next(this.convertTextOCR(JSON.parse(data._body)));
                }, (err) => {
                    this.handleError(err);
                });
            });
        });
    }

    convertBlob(imageURL) {
        return new Observable<any>(observer => {

            let image = new Image();
            image.crossOrigin = 'Anonymous';
            let onload = function () {
                let canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;

                let ctx = canvas.getContext('2d');
                ctx.drawImage(this, 0, 0);

                canvas.toBlob((blob) => {
                    observer.next(blob);
                });
            };

            image.onload = onload;
            image.src = imageURL;
        });
    }

    convertTextOCR(ocrObject) {
        let plainText = '';
        if (ocrObject.regions !== null) {
            for (let i = 0; i < ocrObject.regions.length; i++) {

                for (let j = 0; j < ocrObject.regions[i].lines.length; j++) {
                    for (let k = 0; k < ocrObject.regions[i].lines[j].words.length; k++) {
                        plainText += ocrObject.regions[i].lines[j].words[k].text + ' ';
                    }
                    plainText += '\n';
                }
                plainText += '\n';
            }
        }
        return plainText;
    }

    private handleError(error: any) {
        this.logService.error(error);
        return Observable.throw(error || 'Server error');
    }
}
