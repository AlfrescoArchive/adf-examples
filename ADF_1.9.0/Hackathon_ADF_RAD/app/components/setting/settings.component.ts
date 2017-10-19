import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlfrescoSettingsService, LogService, StorageService } from 'ng2-alfresco-core';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    host: {
        'class': 'adf-app-settings'
    },
    styleUrls: ['settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsComponent {

    HOST_REGEX: string = '^(http|https):\/\/.*[^/]$';

    ecmHost: string;
    ecmHostTmp: string;
    bpmHost: string;
    bpmHostTmp: string;
    urlFormControlEcm = new FormControl('', [Validators.required, Validators.pattern(this.HOST_REGEX)]);
    urlFormControlBpm = new FormControl('', [Validators.required, Validators.pattern(this.HOST_REGEX)]);

    constructor(private settingsService: AlfrescoSettingsService,
                private storage: StorageService,
                private logService: LogService) {
        this.ecmHostTmp = this.ecmHost = storage.getItem('ecmHost') || this.settingsService.ecmHost;
        this.bpmHostTmp = this.bpmHost = storage.getItem('bpmHost') || this.settingsService.bpmHost;
    }

    public onChangeECMHost(event: KeyboardEvent): void {
        let value = (<HTMLInputElement> event.target).value.trim();
        if (value && this.isValidUrl(value)) {
            this.logService.info(`ECM host: ${value}`);
            this.ecmHostTmp = value;
        } else {
            console.error('Ecm address does not match the pattern');
        }
    }

    public onChangeBPMHost(event: KeyboardEvent): void {
        let value = (<HTMLInputElement> event.target).value.trim();
        if (value && this.isValidUrl(value)) {
            this.logService.info(`BPM host: ${value}`);
            this.bpmHostTmp = value;
        } else {
            console.error('Bpm address does not match the pattern');
        }
    }

    public save(event: KeyboardEvent): void {
        if (this.bpmHost !== this.bpmHostTmp) {
            this.storage.setItem(`bpmHost`, this.bpmHostTmp);
        }
        if (this.ecmHost !== this.ecmHostTmp) {
            this.storage.setItem(`ecmHost`, this.ecmHostTmp);
        }
        window.location.href = '/';
    }

    isValidUrl(url: string) {
        return /^(http|https):\/\/.*/.test(url);
    }

}
