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


import { NgModule, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { WidgetComponent } from 'ng2-activiti-form';
import { MultilineTextWidget, ActivitiForm } from 'ng2-activiti-form';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { Comment, ActivitiTaskListModule, ActivitiTaskListService, TaskDetailsModel } from 'ng2-activiti-tasklist';
import { ActivitiProcessService, ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { ObjectDataTableAdapter, DataTableAdapter } from 'ng2-alfresco-datatable';
import { MdDialog, MdDialogModule } from '@angular/material';

@Component({
    selector: 'process-comments',
    templateUrl: 'process-comments.html',
    styleUrls: ['./process-comments.css']
})
export class ProcessCommentsComponent extends WidgetComponent implements OnInit {

    disabled: boolean = true;
    inputText: string = null;
    
    data: DataTableAdapter;
    
    comments: Comment[] = [];
    
    processInstanceId: string;
    
    taskId: string = null;
    
    @Output()
    error: EventEmitter<any> = new EventEmitter<any>();

    private defaultSchemaColumn: any[] = [
        { type: 'date', key: 'created', title: 'Date', sortable: true },
        { type: 'text', key: 'createdBy.firstName', title: 'First Name', sortable: true },
        { type: 'text', key: 'createdBy.lastName', title: 'Last Name', sortable: true },
        { type: 'text', key: 'createdBy.email', title: 'Email', sortable: true },
        { type: 'text', key: 'message', title: 'Comment', cssClass: 'full-width ellipsis-cell', sortable: false }
    ];


    constructor(
        private activitiProcess: ActivitiProcessService,
        private activitiTaskList: ActivitiTaskListService,
        public dialog: MdDialog) {
        super();
    }

    ngOnInit() {
        // console.log(this);
        this.taskId = this.field.form.taskId;
        if (this.taskId) {
            this.loadProcessComments(this.taskId);
        }
    }

    initDefaultSchemaColumns(): ObjectDataTableAdapter {
        return new ObjectDataTableAdapter(
            this.comments,
            this.defaultSchemaColumn
        );
    }

    private loadProcessComments(taskId: string) {
        this.activitiTaskList.getTaskDetails(this.taskId).subscribe(
            (res: TaskDetailsModel) => {
                this.processInstanceId = res.processInstanceId;
                this.getProcessComments(this.processInstanceId);
            },
            (err) => {
                this.error.emit(err);
            }
        );
    }

    private getProcessComments(processInstanceId: string) {
        this.comments = [];
        this.activitiProcess.getProcessInstanceComments(processInstanceId).subscribe(
            (res: Comment[]) => {
                // console.log(res);
                this.comments.push.apply(this.comments, res);
                this.data = this.initDefaultSchemaColumns();
            },
            (err) => {
                this.error.emit(err);
            }
        );
    }

    private addComment() {
        this.activitiTaskList.addTaskComment(this.taskId, this.inputText).subscribe(
            (res: Comment) => {
                // this.comments.push(res);
                // this.data = this.initDefaultSchemaColumns();
                // The above approach is adding the date in a different format! Hence getting the comments again.
                this.getProcessComments(this.processInstanceId);
                this.inputText = '';
            },
            (err) => {
                this.error.emit(err);
            }
        );
    }

    private clearComment() {
        this.inputText = '';
    }

    commentDetails(event): void {
        // console.log(event.value.obj.message);
        let dialogRef = this.dialog.open(ProcessCommentDetailsComponent);
        dialogRef.componentInstance.inputComment = event.value.obj;
    }
}

@Component({
  selector: 'process-comment-details-dialog',
  templateUrl: 'process-comment-details.html'
})
export class ProcessCommentDetailsComponent {
    inputComment: Comment;
}


@NgModule({
    imports: [FormsModule, CommonModule, DataTableModule, ActivitiTaskListModule, ActivitiProcessListModule, MdDialogModule],
    declarations: [ProcessCommentsComponent, ProcessCommentDetailsComponent],
    exports: [ProcessCommentsComponent, ProcessCommentDetailsComponent],
    entryComponents: [ProcessCommentsComponent, ProcessCommentDetailsComponent]
})
export class CustomEditorsModule { }
