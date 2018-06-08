import { Component } from '@angular/core';
import { TranslationService, AuthenticationService, LogService } from '@alfresco/adf-core';
import { Router } from '@angular/router';
import * as Mixpanel from 'mixpanel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(translationService: TranslationService,
              private authService: AuthenticationService,
              private logService: LogService,
              private router: Router) {
    translationService.use('en');

    const mixpanel: any = Mixpanel.init('YOUR_MIXPANEL_TOKEN');
    mixpanel.set_config({ debug: true });

    logService.onMessage.subscribe((message) => {
      mixpanel.track(message.text, {
        type: message.type
      });

    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
