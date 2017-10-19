

import { Component, ViewEncapsulation } from '@angular/core';
import { AlfrescoTranslationService } from 'ng2-alfresco-core';

@Component({
    templateUrl: 'app-layout.component.html',
    styleUrls: ['app-layout.component.scss'],
    host: {
        'class': 'adf-app-layout'
    },
    encapsulation: ViewEncapsulation.None
})
export class AppLayoutComponent {

    links: Array<any> = [
        { href: '/home', icon: 'home', title: 'Home' },
         { href: '/rad', icon: 'device_hub', title: 'Rad' },
        { href: '/login', icon: 'vpn_key', title: 'Login' },
        { href: '/about', icon: 'info_outline', title: 'About' }
    ];

    constructor(private translateService: AlfrescoTranslationService) {}

    changeLanguage(lang: string) {
        this.translateService.use(lang);
    }
}
