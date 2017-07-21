

import { Component, NgModule, EventEmitter, Output, Input} from '@angular/core';
import { TaskStepModel } from './task-step.model';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

// Courtesy https://codepen.io/sharafat_8271/pen/KVWMXP

@Component({
    selector: 'process-task-stepper',
    templateUrl: 'processs-task-stepper.html',
    styleUrls: ['./process-task-stepper.css']
})
export class ProcessTaskStepperComponent {
    
    @Input()
    steps: TaskStepModel[] = [];

    taskId: string = '';

    @Output()
    onStepChange: EventEmitter<string> = new EventEmitter<string>();

    stepClicked(event, stepSelected: TaskStepModel) {
        console.log(stepSelected);
        this.onStepChange.emit(stepSelected.taskId);
    }
}

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [ProcessTaskStepperComponent],
    exports: [ProcessTaskStepperComponent],
    entryComponents: [ProcessTaskStepperComponent]
})
export class ProcessTaskStepperModule { }
