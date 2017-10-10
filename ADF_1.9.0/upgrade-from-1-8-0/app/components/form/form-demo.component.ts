
import { Component, Inject, OnInit } from '@angular/core';
import { FormModel, FormService } from 'ng2-activiti-form';
import { InMemoryFormService } from '../../services/in-memory-form.service';
import { DemoForm } from './demo-form';

@Component({
    selector: 'form-demo',
    templateUrl: 'form-demo.component.html',
    styleUrls: [ 'form-demo.component.css' ],
    providers: [
        { provide: FormService, useClass: InMemoryFormService }
    ]
})
export class FormDemoComponent implements OnInit {

    form: FormModel;

    constructor(@Inject(FormService) private formService: InMemoryFormService) {
        // Prevent default outcome actions
        formService.executeOutcome.subscribe(e => {
            e.preventDefault();
            console.log(e.outcome);
        });
    }

    ngOnInit() {
        let formDefinitionJSON: any = DemoForm.getDefinition();
        this.form = this.formService.parseForm(formDefinitionJSON);
    }

}
