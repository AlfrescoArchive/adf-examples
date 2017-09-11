import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivitiStartForm, FormService, FormEvent, FormModel } from 'ng2-activiti-form';
import { ActivitiProcessService, ProcessInstance } from 'ng2-activiti-processlist';
import { AppConfigService } from 'ng2-alfresco-core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'app-new-leave-request',
    templateUrl: './new-leave-request.component.html',
    styleUrls: ['./new-leave-request.component.css']
})
export class NewLeaveRequestComponent implements OnDestroy {

    appId: string;
    processDefinitionKey: string;
    processDefinitionId: string;
    processInstanceNamePrefix: string = 'Leave Request - ';

    @ViewChild(ActivitiStartForm)
    startForm: ActivitiStartForm;

    sub: Subscription;

    cloneRequest: string;
    cloneProcessInstanceId: string;

    constructor(public router: Router,
        private route: ActivatedRoute,
        private appConfig: AppConfigService,
        private activitiProcess: ActivitiProcessService,
        private formService: FormService) {

        this.appId = appConfig.get('leaveRequestAppId').toString();
        this.processDefinitionKey = appConfig.get('leaveRequestProcessDefinitionKey').toString();

        this.activitiProcess.getProcessDefinitions(this.appId)
            .flatMap(response => response)
            .filter((process) => process.key === this.processDefinitionKey)
            .subscribe(response => {
                this.processDefinitionId = response.id;
            });

        formService.formLoaded.subscribe((e: FormEvent) => {
            if (this.cloneProcessInstanceId) {
                this.populateFormFromPreviousRequest(this.cloneProcessInstanceId, e.form);
            }
            // generate a unique id
            e.form.getFieldById('leaverequestid').value = 'REQ-' + (new Date().getTime()).toString();
        });
    }

    ngOnInit() {
        this.sub = this.route
            .queryParams
            .subscribe(queryParams => {
                this.cloneRequest = queryParams['cloneRequest'] || '';
                this.cloneProcessInstanceId = queryParams['processInstanceId'] || '';
            });
    }

    public startProcess(outcome: string) {
        if (this.processDefinitionId) {
            let formValues = this.startForm ? this.startForm.form.values : undefined;
            this.activitiProcess.startProcess(this.processDefinitionId, this.processInstanceNamePrefix + new Date(), outcome, formValues).subscribe(
                (res) => {
                    this.router.navigate(['/home']);
                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }

    private populateFormFromPreviousRequest(processInstanceId: string, form: FormModel): void {
        console.log(form);
        this.activitiProcess.getProcess(processInstanceId).subscribe(
            (processInstance: ProcessInstance) => {
                for (let variable of processInstance.variables) {
                    if (variable.name === 'name') {
                        form.getFieldById('name').value = variable.value;
                    }
                    if (variable.name === 'employeeid') {
                        form.getFieldById('employeeid').value = variable.value;
                    }
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
