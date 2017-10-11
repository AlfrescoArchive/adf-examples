

import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MinimalNodeEntity } from 'alfresco-js-api';
import { AlfrescoAuthenticationService } from 'ng2-alfresco-core';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

    fileNodeId: string;
    fileShowed: boolean = false;
    searchTerm: string = '';

    @Output()
    expand = new EventEmitter();

    constructor(public router: Router,
                public authService: AlfrescoAuthenticationService) {
    }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    /**
     * Called when the user submits the search, e.g. hits enter or clicks submit
     *
     * @param event Parameters relating to the search
     */
    onSearchSubmit(event) {
        this.router.navigate(['/search', {
            q: event.value
        }]);
    }

    onItemClicked(event: MinimalNodeEntity) {
        if (event.entry.isFile) {
            this.fileNodeId = event.entry.id;
            this.fileShowed = true;
        } else if (event.entry.isFolder) {
            this.router.navigate(['/files', event.entry.id]);
        }
    }

    onSearchTermChange(event) {
        this.searchTerm = event.value;
    }

    onExpandToggle(event) {
        this.expand.emit(event);
    }
}
