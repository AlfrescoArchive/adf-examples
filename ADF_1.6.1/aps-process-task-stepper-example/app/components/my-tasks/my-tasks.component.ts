import { Component, ViewChild } from '@angular/core';
import { ActivitiTaskDetails, ActivitiTaskList, FilterRepresentationModel, ActivitiTaskListService, TaskDetailsModel } from 'ng2-activiti-tasklist';
import { ActivitiProcessService } from 'ng2-activiti-processlist';
import { ObjectDataTableAdapter, DataSorting } from 'ng2-alfresco-datatable';
import { FormRenderingService } from 'ng2-activiti-form';
import { TaskStepModel } from '../task-stepper/task-step.model';
import { CustomTaskService } from './custom-task.service';
import { CustomTaskModel } from './custom-task.model';
import { BpmUserService } from 'ng2-alfresco-userinfo';
import { BpmUserModel } from 'ng2-alfresco-userinfo/src/models/bpm-user.model';


@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css'],
  providers: [CustomTaskService]
})
export class MyTasksComponent {

  @ViewChild(ActivitiTaskList)
  activititasklist: ActivitiTaskList;

  @ViewChild(ActivitiTaskDetails)
  activitidetails: ActivitiTaskDetails;

  currentTaskId: string;

  currentProcessInstanceId: string;

  myTaskList: boolean = true;

  taskState: string = 'open';

  myTaskListDataTable: ObjectDataTableAdapter;

  dataTasks: ObjectDataTableAdapter;

  dataProcesses: ObjectDataTableAdapter;

  steps: TaskStepModel[] = [];

  userId: string = '';

  constructor(
    private formRenderingService: FormRenderingService,
    private activitiProcessListService: ActivitiProcessService,
    private activitiTaskListService: ActivitiTaskListService,
    private customAdfTaskService: CustomTaskService,
    private bpmUserService: BpmUserService
  ) {
    this.myTaskListDataTable = new ObjectDataTableAdapter(
      [],
      [
        { type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: true },
        { type: 'date', key: 'created', title: 'Created', cssClass: 'full-width name-column', sortable: true }
      ]
    );
    this.myTaskListDataTable.setSorting(new DataSorting('created', 'desc'));
    this.bpmUserService.getCurrentUserInfo()
      .subscribe((response) => {
        let bpmUser = <BpmUserModel>response;
        this.userId = bpmUser.id;
      });
  }

  onSuccessTaskList(event: FilterRepresentationModel) {
    this.currentTaskId = this.activititasklist.getCurrentId();
  }

  onTaskRowClick(taskId) {

    this.currentTaskId = taskId;
    this.myTaskList = false;
    this.activitiTaskListService.getTaskDetails(taskId).subscribe(
      (taskDetailsResponse: TaskDetailsModel) => {
        this.currentProcessInstanceId = taskDetailsResponse.processInstanceId;
        this.customAdfTaskService.processInstanceTaskQuery(this.currentProcessInstanceId).subscribe(
          (response: CustomTaskModel[]) => {
            this.convertAdfTaskListToStepModel(response);
            console.log(this.activitidetails.readOnlyForm);
          },
          (err) => {
            console.log('Error getting adf task list response ' + err);
          }
        );
      },
      (err) => {
        console.log('Error getting task details ' + err);
      }
    );
  }

  convertAdfTaskListToStepModel(taskList: CustomTaskModel[]) {
    this.steps = [];
    taskList.forEach(task => {
      let step = new TaskStepModel();
      if (task.id === this.currentTaskId) {
        step.isSelected = true;
      } else {
        step.isSelected = false;
      }
      step.name = task.name;
      step.createdDate = task.created;
      if (task.endDate) {
        step.completedDate = task.endDate;
      }
      if (task.assignee) {
        step.assigneeName = task.assignee.firstName + ' ' + task.assignee.lastName;
        if (this.userId === task.assignee.id) {
          step.isAssignedToCurrentUser = true;
        }
      }

      step.taskId = task.id;
      if (task.endDate) {
        step.isComplete = true;
      } else {
        step.isComplete = false;
      }
      this.steps.push(step);
    });
  }

  backToTaskList() {
    this.myTaskList = true;
  }

  onFormCompletedInTaskList(form) {
    console.log(form);
    this.currentTaskId = null;
    this.myTaskList = true;
  }

  taskSelectionChanged(taskId) {
    console.log('the changed task id is ' + taskId);
    this.currentTaskId = taskId;
    this.onTaskRowClick(taskId);
    /*this.steps.forEach((step, index) => {
      if (step.taskId === taskId) {
        this.steps[index].isSelected = true;
      } else {
        this.steps[index].isSelected = false;
      }
    });*/
  }
}
