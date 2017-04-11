import { Component, ViewChild } from '@angular/core';
import { ActivitiTaskList } from 'ng2-activiti-tasklist';

@Component({
    selector: 'tasklist-component',
    templateUrl: './tasklist.component.html',
    styleUrls: ['./tasklist.component.css']
})
export class TaskListPageComponent {

    // Task list component.
    @ViewChild('taskList')
    taskList: ActivitiTaskList;

    // Flag used to show/hide the task panel.
    showTaskPanel: boolean = false;

    // Task identifier.
    taskId: string = "";

    /**
     * Task selection into the task list.
     * @param event 
     */
    taskClickedOnTaskList(event: any) {

        if (this.taskId == event) {
            // Toggling the task panel.
            this.showTaskPanel = !this.showTaskPanel;
        }
        else {
            // Showing the task panel for the new task.
            this.taskId = event;
            this.showTaskPanel = true;
        }
    }

    /**
     * Complete button pressed into the task list.
     */
    completeButtonClicked() {

        // Hide the task panel.
        this.showTaskPanel = false;

        // Refresh the task list.
        this.taskList.reload();
    }

}