

import { Component, ViewChild } from '@angular/core';
import { SignatureComponent, SignatureViewerComponent } from '../customstencils/signature';
import { CustomStencil01 } from '../customstencils/custom-stencil-01.component';

import { TaskDetailsComponent, TaskListComponent, FilterRepresentationModel } from '@alfresco/adf-process-services';
import { ObjectDataTableAdapter, DataSorting, FormRenderingService } from '@alfresco/adf-core';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent {

  @ViewChild(TaskListComponent)
  activititasklist: TaskListComponent;

  @ViewChild(TaskDetailsComponent)
  activitidetails: TaskDetailsComponent;

  currentTaskId: string;
  myTaskList = true;
  taskState = 'open';
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
    this.formRenderingService.setComponentTypeResolver('custom_stencil_01', () => CustomStencil01, true);
  }

  ngOnInit() {
    const w: any = window;
        if (w.adf === undefined) {
            w.adf = {};
        }
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
