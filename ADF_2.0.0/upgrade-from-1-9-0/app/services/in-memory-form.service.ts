

import { Injectable } from '@angular/core';
import { EcmModelService, FormFieldOption, FormService } from 'ng2-activiti-form';
import { AlfrescoApiService, LogService } from 'ng2-alfresco-core';
import { AppConfigService } from 'ng2-alfresco-core';
import { Observable } from 'rxjs/Rx';

interface ActivitiData {
    rest: {
        fields: Array<{
            processId?: string,
            taskId?: string,
            fieldId?: string,
            values?: Array<{
                id: string,
                name: string
            }>
        }>
    };
}

@Injectable()
export class InMemoryFormService extends FormService {

    private data: ActivitiData;

    constructor(appConfig: AppConfigService,
                ecmModelService: EcmModelService,
                apiService: AlfrescoApiService,
                logService: LogService) {
        super(ecmModelService, apiService, logService);
        this.data = appConfig.get<ActivitiData>('activiti');
    }

    /** @override */
    getRestFieldValues(taskId: string, fieldId: string): Observable<FormFieldOption[]> {
        // Uncomment this to use original call
        // return super.getRestFieldValues(taskId, fieldId);

        console.log(`getRestFieldValues: ${taskId} => ${fieldId}`);
        return new Observable<FormFieldOption[]>(observer => {
            let field = this.data.rest.fields.find(
                f => f.taskId === taskId && f.fieldId === fieldId
            );
            let values: FormFieldOption[] = field.values || [];
            console.log(values);
            observer.next(values);
        });
    }

    /** @override */
    getRestFieldValuesByProcessId(processDefinitionId: string, fieldId: string): Observable<any> {
        // Uncomment this to use original call
        // return super.getRestFieldValuesByProcessId(processDefinitionId, fieldId);

        console.log(`getRestFieldValuesByProcessId: ${processDefinitionId} => ${fieldId}`);
        return new Observable<FormFieldOption[]>(observer => {
            let field = this.data.rest.fields.find(
                f => f.processId === processDefinitionId && f.fieldId === fieldId
            );
            let values: FormFieldOption[] = field.values || [];
            console.log(values);
            observer.next(values);
        });
    }

}
