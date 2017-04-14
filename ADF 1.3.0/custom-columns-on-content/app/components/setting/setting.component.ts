

import { Component } from '@angular/core';
import { AlfrescoSettingsService, StorageService, LogService } from 'ng2-alfresco-core';

@Component({
  selector: 'alfresco-setting-demo',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {

  ecmHost: string;
  bpmHost: string;

  constructor(private settingsService: AlfrescoSettingsService,
              private storage: StorageService,
              private logService: LogService) {
    this.ecmHost = this.settingsService.ecmHost;
    this.bpmHost = this.settingsService.bpmHost;
  }

  public onChangeECMHost(event: KeyboardEvent): void {
    let value = (<HTMLInputElement>event.target).value.trim();
    if (value) {
      this.logService.info(`ECM host: ${value}`);
      this.ecmHost = value;
      this.settingsService.ecmHost = value;
      this.storage.setItem(`ecmHost`, value);
    }
  }

  public onChangeBPMHost(event: KeyboardEvent): void {
    let value = (<HTMLInputElement>event.target).value.trim();
    if (value) {
      this.logService.info(`BPM host: ${value}`);
      this.bpmHost = value;
      this.settingsService.bpmHost = value;
      this.storage.setItem(`bpmHost`, value);
    }
  }

}
