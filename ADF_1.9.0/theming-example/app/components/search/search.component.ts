

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'search-component',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    fileNodeId: string;
    fileShowed: boolean = false;

    constructor(public router: Router) {
    }

    nodeDbClick($event: any) {
        if ($event.value.entry.isFolder) {
            this.router.navigate(['/files', $event.value.entry.id]);
        } else {
            this.showFile($event);
        }
    }

    showFile($event) {
        if ($event.value.entry.isFile) {
            this.fileNodeId = $event.value.entry.id;
            this.fileShowed = true;
        } else {
            this.fileShowed = false;
        }
    }
}
