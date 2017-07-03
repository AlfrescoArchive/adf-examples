
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
    AlfrescoTranslationService, 
    AlfrescoAuthenticationService, 
    AlfrescoSettingsService, 
    StorageService, 
    LogService 
} from 'ng2-alfresco-core';

@Component({
    selector: 'alfresco-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // URLs to content and process services.
    ecmHost: string = 'http://127.0.0.1:8080';
    bpmHost: string = 'http://127.0.0.1:9999';

    // Flag used to show/hide the helping card.
    showHelpingCard: boolean = false;

    /**
     * Constructor.
     * 
     * @param authService 
     * @param router 
     * @param settingsService 
     * @param translateService 
     * @param storage 
     * @param logService 
     */
    constructor(private authService: AlfrescoAuthenticationService,
                private router: Router,
                private settingsService: AlfrescoSettingsService,
                private translateService: AlfrescoTranslationService,
                private storage: StorageService,
                private logService: LogService) {

        this.setEcmHost();
        this.setBpmHost();
        this.setProvider();

        if (translateService) {
            translateService.addTranslationFolder('app', 'resources');
        }
    }

    /**
     * Manages the logout from the application.
     * 
     * @param event 
     */
    onLogout(event) {

        event.preventDefault();

        this.authService.logout()
            .subscribe(
                () => {
                    this.navigateToLogin();
                },
                (error: any) => {
                    if (error && error.response && error.response.status === 401) {
                        this.navigateToLogin();
                    } else {
                        this.logService.error('An unknown error occurred while logging out', error);
                        this.navigateToLogin();
                    }
                }
            );
    }

    /**
     * Toggle the flag used to show/hide the helping card.
     */
    toggleShowHelpingCard() {
        this.showHelpingCard = !this.showHelpingCard;
    }

    /**
     * Change the page to the login.
     */
    navigateToLogin() {
        this.router.navigate(['/login']);
    }

    /**
     * Set the URL to content services.
     */
    private setEcmHost() {
        if (this.storage.hasItem(`ecmHost`)) {
            this.settingsService.ecmHost = this.storage.getItem(`ecmHost`);
            this.ecmHost = this.storage.getItem(`ecmHost`);
        } else {
            this.settingsService.ecmHost = this.ecmHost;
        }
    }

    /**
     * Set the URL to process services.
     */
    private setBpmHost() {
        if (this.storage.hasItem(`bpmHost`)) {
            this.settingsService.bpmHost = this.storage.getItem(`bpmHost`);
            this.bpmHost = this.storage.getItem(`bpmHost`);
        } else {
            this.settingsService.bpmHost = this.bpmHost;
        }
    }

    /**
     * Set providers.
     */
    private setProvider() {
        if (this.storage.hasItem(`providers`)) {
            this.settingsService.setProviders(this.storage.getItem(`providers`));
        }
    }
}
