import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService, PageTitleService, StorageService } from '@alfresco/adf-core';

@Component({
  selector: 'adf-app',
  templateUrl: './app.component.html',
  styleUrls: ['./theme.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  searchTerm: string = '';

  constructor(private settingsService: SettingsService,
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
