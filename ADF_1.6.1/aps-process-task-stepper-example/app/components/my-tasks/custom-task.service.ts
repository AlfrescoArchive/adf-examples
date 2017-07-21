
// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BpmClient, AlfrescoApi } from 'alfresco-js-api';
import { CustomTaskModel } from './custom-task.model';
import { AlfrescoApiService } from 'ng2-alfresco-core';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomTaskService {

    alfrescoApi: AlfrescoApi;
    apsUrlBase: string;
    apsUrlContextRoot: string;
    tasksUri: string = 'api/enterprise/historic-tasks/query';
    tasksUrl: string;

    // Resolve HTTP using the constructor
    constructor(private http: Http, private alfrescoApiService: AlfrescoApiService) {
        this.alfrescoApi = this.alfrescoApiService.getInstance();
        this.apsUrlBase = this.alfrescoApi.config.hostBpm;
        this.apsUrlContextRoot = this.alfrescoApi.config.contextRootBpm;
        this.tasksUrl = this.apsUrlBase + '/' + this.apsUrlContextRoot + '/' + this.tasksUri;
        
    }

    processInstanceTaskQuery(processInstanceId: string): Observable<CustomTaskModel[]> {
        let headers: Headers = new Headers();
        headers.append('Authorization', this.alfrescoApi.config.ticketBpm); 
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.tasksUrl, '{"processInstanceId":"' + processInstanceId + '","sort":"desc"}', {headers: headers})
            .map((res: Response) => res.json().data)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
