import { NgModule, Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { WidgetComponent } from '@alfresco/adf-core';


@Component({
    selector: 'signature',
    templateUrl: 'signature.html'
})
export class SignatureComponent extends WidgetComponent {

    @ViewChild
    (SignaturePad) signaturePad: SignaturePad;

    private signaturePadOptions: Object;

    constructor() {
        super();
        this.signaturePadOptions = { // passed through to szimek/signature_pad constructor
        'minWidth': 1,
        'canvasWidth': 500,
        'canvasHeight': 300
        };
    }

    ngAfterViewInit() {
        // this.signaturePad is now available
        if (this.signaturePad != null) {
            this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
            this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
            console.log(this);
            if (this.field.value != null) {
                this.signaturePad.fromDataURL(this.field.value);
            }
        }
    }


    clear() {
        this.signaturePad.clear();
        console.log('cleared');
    }

    sign() {
        this.field.value = this.signaturePad.toDataURL();
        console.log(this.field.value);

    }

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        console.log(this.signaturePad.toDataURL());

    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }

}

@Component({
    selector: 'signature-viewer',
    templateUrl: 'signatureViewer.html'
})
export class SignatureViewerComponent extends WidgetComponent {

}

import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
    declarations: [SignatureComponent, SignatureViewerComponent],
    exports: [SignatureComponent, SignatureViewerComponent],
    imports: [SignaturePadModule],
    entryComponents: [SignatureComponent, SignatureViewerComponent]
})
export class SignatureModule { }
