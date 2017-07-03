import { Component, ViewChild } from '@angular/core';
import {
    ActivitiStartProcessInstance,
    ProcessInstance
} from 'ng2-activiti-processlist';

// Used for the dialog windows.
declare let dialogPolyfill: any;

@Component({
    selector: 'creatingProcessesAndTasks-component',
    templateUrl: './creatingProcessesAndTasks.component.html',
    styleUrls: ['./creatingProcessesAndTasks.component.css']
})
export class CreatingProcessesAndTasksPageComponent {

    @ViewChild('dialogWindows')
    dialogWindows: any;

    // Application id.
    appId: number = null;

    // Flag used to show/hide the panel for starting processes.
    showActivitiStartProcess: boolean = false;

    // Result message used in the dialog windows.
    resultMessage: string = "";

    /**
     * Selecting the Alfresco Process Services app.
     * @param event 
     */
    onAppClick(event: any) {
        this.appId = event.id;
    }

    /**
     * Start process button clicked.
     */
    startingProcessClicked() {
        this.showActivitiStartProcess = !this.showActivitiStartProcess;
    }

    /**
     * Process started event.
     * @param event 
     */
    onStartProcessInstance(event: any) {
        this.resultMessage = "Process instance created with id:" + event.id + ".";
        this.showDialogWindows();
        this.showActivitiStartProcess = !this.showActivitiStartProcess;
    }

    /**
     * Task started with success event.
     * @param event 
     */
    onStartTaskSuccess(event: any) {
        this.resultMessage = "Task created with id:" + event.id + ".";
        this.showDialogWindows();
    }

    /**
     * 
     */
    showDialogWindows() {
        if (!this.dialogWindows.nativeElement.showModal) {
            dialogPolyfill.registerDialog(this.dialogWindows.nativeElement);
        }
        if (this.dialogWindows) {
            this.dialogWindows.nativeElement.showModal();
        }
    }

    closeDialogWindows() {
        if (this.dialogWindows) {
            this.dialogWindows.nativeElement.close();
        }
    }
}