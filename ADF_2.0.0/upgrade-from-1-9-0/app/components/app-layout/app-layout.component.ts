

import { Component, ViewEncapsulation } from '@angular/core';
import { TranslationService } from '@alfresco/adf-core';

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
         { href: '/files', icon: 'folder_open', title: 'Content Services' },
         { href: '/activiti', icon: 'device_hub', title: 'Process Services' },
        { href: '/login', icon: 'vpn_key', title: 'Login' },
        { href: '/form', icon: 'poll', title: 'Form' },
        { href: '/settings', icon: 'settings', title: 'Settings' },
        { href: '/about', icon: 'info_outline', title: 'About' }
    ];

    constructor(private translateService: TranslationService) {}

    changeLanguage(lang: string) {
        this.translateService.use(lang);
    }
}
