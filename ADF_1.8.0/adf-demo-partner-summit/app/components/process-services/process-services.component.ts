/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'alfresco-js-api';
import {
  AppsListComponent,
  FilterRepresentationModel,
  TaskDetailsComponent,
  TaskDetailsEvent,
  TaskFiltersComponent,
  TaskListComponent,
  TaskListService
} from 'ng2-activiti-tasklist';
import {
  FilterProcessRepresentationModel,
  ProcessFiltersComponent,
  ProcessInstance,
  ProcessInstanceDetailsComponent,
  ProcessInstanceListComponent,
  StartProcessInstanceComponent
} from 'ng2-activiti-processlist';
import { FormRenderingService } from 'ng2-activiti-form';
import { AlfrescoApiService } from 'ng2-alfresco-core';
import {
  DataSorting,
  ObjectDataRow,
  ObjectDataTableAdapter
} from 'ng2-alfresco-datatable';
import { SignatureComponent, SignatureViewerComponent } from '../customstencils/signature';
import { Subscription } from 'rxjs/Rx';

const currentTaskIdNew = '__NEW__';
const currentProcessIdNew = '__NEW__';
@Component({
  selector: 'process-services',
  templateUrl: './process-services.component.html',
  styleUrls: ['./process-services.component.css']
})
export class ProcessServicesComponent implements OnDestroy, OnInit {

  @ViewChild(TaskFiltersComponent)
  activitifilter: TaskFiltersComponent;

  @ViewChild(TaskListComponent)
  taskList: TaskListComponent;

  @ViewChild(TaskDetailsComponent)
  activitidetails: TaskDetailsComponent;
  
  @Input()
  appId: number = null;

  fileShowed: boolean = false;

  private tabs = { tasks : 0 , processes : 1};

  content: Blob;
  contentName: string;
  taskListMode: boolean = true;
  layoutType: string;
  currentTaskId: string;
  showTaskAuditAndRelatedContent: boolean = false;
  taskSchemaColumns: any [] = [];
  taskPagination: Pagination = {
    skipCount: 0,
    maxItems: 10,
    totalItems: 0
  };
  taskPage: number = 0;
  activeTab: number = this.tabs.tasks; // tasks|processes
  taskFilter: FilterRepresentationModel;
  sub: Subscription;
  blobFile: any;
  dataTasks: ObjectDataTableAdapter;
  taskDetailsToggleText: string = 'Show Task Audit Log and Attachments';

  @ViewChild(ProcessFiltersComponent)
  activitiprocessfilter: ProcessFiltersComponent;

  @ViewChild(ProcessInstanceListComponent)
  processList: ProcessInstanceListComponent;

  @ViewChild(ProcessInstanceDetailsComponent)
  activitiprocessdetails: ProcessInstanceDetailsComponent;

  @ViewChild(StartProcessInstanceComponent)
  activitiStartProcess: StartProcessInstanceComponent;

  dataProcesses: ObjectDataTableAdapter;
  currentProcessInstanceId: string;
  isDiagramMode: boolean = false;
  processFilter: FilterProcessRepresentationModel;
  

  constructor(private elementRef: ElementRef,
              private route: ActivatedRoute,
              private router: Router,
              private taskListService: TaskListService,
              private apiService: AlfrescoApiService,
              private formRenderingService: FormRenderingService) {
    this.dataTasks = new ObjectDataTableAdapter(
      [],
      [
        { type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: true },
        { type: 'text', key: 'assignee.firstName' , title: 'Assignee', cssClass: 'full-width name-column', sortable: true },
        { type: 'text', key: 'priority' , title: 'Priority', cssClass: 'full-width name-column', sortable: true },
        { type: 'date', key: 'created', title: 'Created', cssClass: 'full-width name-column', sortable: true },
        { type: 'date', key: 'dueDate', title: 'Due Date', cssClass: 'full-width name-column', sortable: true }
      ]
    );
    this.dataTasks.setSorting(new DataSorting('created', 'desc'));

    this.dataProcesses = new ObjectDataTableAdapter(
      [],
      [ 
        { type: 'text', key: 'processDefinitionName', title: 'Process Name', cssClass: 'full-width name-column', sortable: true },
        { type: 'text', key: 'name', title: 'Instance Name', cssClass: 'full-width name-column', sortable: true },
        { type: 'text', key: 'startedBy.firstName' , title: 'Started By', cssClass: 'full-width name-column', sortable: true },
        { type: 'date', key: 'started', title: 'Started', cssClass: 'full-width name-column', sortable: true }
      ]
    );
    this.dataProcesses.setSorting(new DataSorting('started', 'desc'));
    this.formRenderingService.setComponentTypeResolver('signature', () => SignatureComponent, true);
    this.formRenderingService.setComponentTypeResolver('signatureviewer', () => SignatureViewerComponent, true);
  }

  onPrevPage(pagination: Pagination): void {
    this.taskPagination.skipCount = pagination.skipCount;
    this.taskPage--;
  }

  onNextPage(pagination: Pagination): void {
    this.taskPagination.skipCount = pagination.skipCount;
    this.taskPage++;
  }

  onChangePageSize(pagination: Pagination): void {
    const { skipCount, maxItems } = pagination;
    this.taskPage = this.currentPage(skipCount, maxItems);
    this.taskPagination.maxItems = maxItems;
    this.taskPagination.skipCount = skipCount;
  }

  onChangePageNumber(pagination: Pagination): void {
    const { maxItems, skipCount } = pagination;
    this.taskPage = this.currentPage(skipCount, maxItems);
    this.taskPagination.maxItems = maxItems;
    this.taskPagination.skipCount = skipCount;
  }

  currentPage(skipCount: number, maxItems: number): number {
    return (skipCount && maxItems) ? Math.floor(skipCount / maxItems) : 0;
  }

  ngOnInit() {
    this.taskListService.tasksList$.subscribe(
      (tasks) => {
        this.taskPagination = {count: tasks.data.length, maxItems: this.taskPagination.maxItems, skipCount: this.taskPagination.skipCount, totalItems: tasks.total};
        console.log({count: tasks.data.length, maxItems: this.taskPagination.maxItems, skipCount: this.taskPagination.skipCount, totalItems: tasks.total});
      }, (err) => {
        console.log('err');
      });

    this.sub = this.route.params.subscribe(params => {
      let applicationId = params['appId'];
      if (applicationId && applicationId !== '0') {
        this.appId = params['appId'];
      }
      this.taskFilter = null;
      this.currentTaskId = null;
    });

    this.layoutType = AppsListComponent.LAYOUT_GRID;

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onTaskFilterClick(filter: FilterRepresentationModel): void {
    this.taskListMode=true;
    this.applyTaskFilter(filter);
  }

  onSuccessTaskFilterList(event: any): void {
    this.applyTaskFilter(this.activitifilter.getCurrentFilter());
  }

  applyTaskFilter(filter: FilterRepresentationModel) {
    this.taskFilter = filter;
    if (filter && this.taskList) {
      this.taskList.hasCustomDataSource = false;
    }
  }

  onStartTaskSuccess(event: any): void {
    this.activitifilter.selectFilterWithTask(event.id);
    this.currentTaskId = event.id;
  }

  isStartTaskMode(): boolean {
    return this.currentTaskId === currentTaskIdNew;
  }
  
  onCancelStartTask() {
    this.currentTaskId = null;
    this.reloadTaskFilters();
  }

  onSuccessTaskList(event: FilterRepresentationModel) {
    this.currentTaskId = this.taskList.getCurrentId();
  }

  onTaskRowClick(taskId): void {
    this.currentTaskId = taskId;
    this.taskListMode = false;
  }

  navigateStartTask(): void {
    this.resetTaskFilters();
    this.reloadTaskFilters();
    this.currentTaskId = currentTaskIdNew;
  }

  private resetTaskFilters(): void {
    this.taskFilter = null;
  }

  onFormCompleted(form): void {
    this.currentTaskId = null;
    this.taskPagination.totalItems--;
    const { skipCount, maxItems, totalItems } = this.taskPagination;
    if (totalItems > 0 && (skipCount >= totalItems)) {
      this.taskPagination.skipCount -= maxItems;
    }
    this.taskPage = this.currentPage(this.taskPagination.skipCount, maxItems);
    this.taskList.reload();
  }

  onFormContentClick(content: any): void {
    this.fileShowed = true;
    this.content = content.contentBlob;
    this.contentName = content.name;
  }

  onTaskCreated(data: any): void {
    this.currentTaskId = data.parentTaskId;
    this.taskList.reload();
  }

  private reloadTaskFilters(): void {
    this.activitifilter.selectFilter(this.activitifilter.getCurrentFilter());
  }

  isTaskCompleted(): boolean {
    return this.activitidetails.isCompletedTask();
  }

  onAssignTask() {
    this.taskList.reload();
    this.currentTaskId = null;
  }

  onTaskDetailsClickBack() {
    this.taskListMode = true;
    this.showTaskAuditAndRelatedContent=false;
    this.taskDetailsToggleText = 'Show Task Audit Log and Attachments';
  }

  onTaskDetailsModeChange() {
    if(this.showTaskAuditAndRelatedContent===true) {
      this.taskDetailsToggleText = 'Show Task Audit Log and Attachments';
      this.showTaskAuditAndRelatedContent=false;
    } else {
      this.showTaskAuditAndRelatedContent=true;
      this.taskDetailsToggleText = 'Show Task Form';
    }
  }


  isStartProcessMode(): boolean {
    return this.currentProcessInstanceId === currentProcessIdNew;
  }

  onSuccessProcessFilterList(): void {
    this.processFilter = this.activitiprocessfilter.getCurrentFilter();
  }

  onProcessFilterClick(event: FilterProcessRepresentationModel): void {
    this.currentProcessInstanceId = null;
    this.processFilter = event;
  }

  onSuccessProcessList(event: any): void {
    this.currentProcessInstanceId = this.processList.getCurrentId();
  }

  navigateStartProcess(): void {
    this.resetProcessFilters();
    this.reloadProcessFilters();
    this.currentProcessInstanceId = currentProcessIdNew;
  }

  private resetProcessFilters(): void {
    this.processFilter = null;
  }
  
  private reloadProcessFilters(): void {
    this.activitiprocessfilter.selectFilter(this.activitiprocessfilter.getCurrentFilter());
  }

  onStartProcessInstance(instance: ProcessInstance): void {
    this.currentProcessInstanceId = instance.id;
    this.activitiStartProcess.reset();
    this.resetProcessFilters();
    this.reloadProcessFilters();
  }

  onCancelProcessInstance() {
    this.currentProcessInstanceId = null;
    this.reloadProcessFilters();
  }

  onClickBack() {
    this.isDiagramMode = false;
  }

  onProcessRowClick(processInstanceId): void {
    this.currentProcessInstanceId = processInstanceId;
    this.isDiagramMode = true;
  }



}
