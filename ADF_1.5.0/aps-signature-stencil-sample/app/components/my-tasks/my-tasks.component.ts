

import { Component, ViewChild } from '@angular/core';
import { ActivitiTaskDetails, ActivitiTaskList, FilterRepresentationModel } from 'ng2-activiti-tasklist';
import { ObjectDataTableAdapter, DataSorting } from 'ng2-alfresco-datatable';
import { FormRenderingService } from 'ng2-activiti-form';
import { SignatureComponent, SignatureViewerComponent } from '../customstencils/signature';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent {

  @ViewChild(ActivitiTaskList)
  activititasklist: ActivitiTaskList;

  @ViewChild(ActivitiTaskDetails)
  activitidetails: ActivitiTaskDetails;

  currentTaskId: string;
  myTaskList: boolean = true;
  taskState: string = 'open';
  myTaskListDataTable: ObjectDataTableAdapter;
  dataTasks: ObjectDataTableAdapter;
  dataProcesses: ObjectDataTableAdapter;

  constructor(
    private formRenderingService: FormRenderingService
  ) {
    this.myTaskListDataTable = new ObjectDataTableAdapter(
      [],
      [
        { type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: true },
        { type: 'date', key: 'created', title: 'Created', cssClass: 'full-width name-column', sortable: true }
      ]
    );
    this.myTaskListDataTable.setSorting(new DataSorting('created', 'desc'));
    this.formRenderingService.setComponentTypeResolver('signature', () => SignatureComponent, true);
    this.formRenderingService.setComponentTypeResolver('signatureviewer', () => SignatureViewerComponent, true);
  }

  onSuccessTaskList(event: FilterRepresentationModel) {
    this.currentTaskId = this.activititasklist.getCurrentId();
  }

  onTaskRowClick(taskId) {
    this.currentTaskId = taskId;
    this.myTaskList = false;
  }

  backToTaskList() {
    this.myTaskList = true;
  }

  onFormCompletedInTaskList(form) {
    console.log(form);
    this.currentTaskId = null;
    this.myTaskList = true;
  }
}
