import { Component } from '@angular/core';
import { ActivitiProcessService, ProcessInstance } from 'ng2-activiti-processlist';
import { AppConfigService } from 'ng2-alfresco-core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-leave-requests',
    templateUrl: './leave-requests.component.html',
    styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent {

    appId: string;
    processDefinitionKey: string;

    leaveDetails: any = {};
    leaveDetailsFormId: string;
    showLeaveDetails: boolean = false;
    curentProcessInstanceId: string;

    constructor(public router: Router,
        private appConfig: AppConfigService,
        private activitiProcess: ActivitiProcessService) {
        this.appId = appConfig.get('leaveRequestAppId').toString();
        this.processDefinitionKey = appConfig.get('leaveRequestProcessDefinitionKey').toString();
        this.leaveDetailsFormId = appConfig.get('leaveDetailsFormId').toString();
    }

    public onProcessRowClick(processInstanceId) {
        this.curentProcessInstanceId = processInstanceId;
        this.activitiProcess.getProcess(processInstanceId).subscribe(
            (processInstance: ProcessInstance) => {
                for (let variable of processInstance.variables) {
                    this.leaveDetails[variable.name] = variable.value;
                    this.showLeaveDetails = true;
                }
                console.log(this.leaveDetails);
                this.leaveDetails['processinstancename'] = processInstance.name;
                this.leaveDetails['applicationdate'] = processInstance.started;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onClickBack() {
        this.showLeaveDetails = false;
    }

    cloneRequest() {
        this.router.navigate(['/new-leave-request'], { queryParams: { 'processInstanceId': this.curentProcessInstanceId, 'cloneRequest': true } });
    }

}
