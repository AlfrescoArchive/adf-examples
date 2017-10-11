import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlfrescoSettingsService, PageTitleService, StorageService } from 'ng2-alfresco-core';

@Component({
  selector: 'adf-app',
  templateUrl: './app.component.html',
  styleUrls: ['./theme.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  searchTerm: string = '';

  constructor(private settingsService: AlfrescoSettingsService,
              private storage: StorageService,
              pageTitleService: PageTitleService,
              route: ActivatedRoute,
              router: Router) {
    this.setProvider();
    pageTitleService.setTitle();
  }

  private setProvider() {
    if (this.storage.hasItem(`providers`)) {
      this.settingsService.setProviders(this.storage.getItem(`providers`));
    }
  }
}
