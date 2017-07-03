import { Component, ViewChild } from '@angular/core';
import { AlfrescoApiService } from 'ng2-alfresco-core';
import { DocumentListComponent } from 'ng2-alfresco-documentlist';

// Used for the dialog windows.
declare let dialogPolyfill: any;

@Component({
    selector: 'contentRepository-component',
    templateUrl: './contentRepository.component.html',
    styleUrls: ['./contentRepository.component.css']
})
export class ContentRepositoryComponent {

    @ViewChild('dialogWindow')
    dialogWindow: any;

    @ViewChild('documentList')
    documentList: DocumentListComponent;

    // Result message used in the dialog windows.
    resultTitle: string = "";
    resultMessage: string = "";

    constructor(private apiService: AlfrescoApiService) {
    }

    /**
     * Custom action on content.
     * @param event 
     */
    contentAction(event: any) {

        var propertyShareId = "qshare:sharedId";

        // Check if the content already has a shared link.
        if (event.value.entry.properties.hasOwnProperty(propertyShareId)) {

            // Defining the dialog box content as a result.
            this.resultTitle = "Already there";
            this.resultMessage = "Share ID altready assigned with value '" + event.value.entry.properties[propertyShareId] + "'.";
            this.showDialogWindow();

        }
        else {

            var contentId = event.value.entry.id;

            // API services.
            var apiServiceInstance = this.apiService.getInstance();

            var sharedLinkBody = new apiServiceInstance.core.SharedLinkBody();
            sharedLinkBody.nodeId = contentId;

            // Calling the API to setup the node with the shareId.
            apiServiceInstance.core.sharedlinksApi.addSharedLink(sharedLinkBody,{}).then(
                data => {

                    // Defining the dialog box content as a result.
                    this.resultTitle = "Done!";
                    this.resultMessage = "Share ID assigned with value '" + data.entry.id + "'.";
                    this.showDialogWindow();

                    // Refreshing the document list.
                    this.documentList.reload();

                },
                error => {
                    console.error(error);
                }
            );
        }
    }

    /**
     * Custom action on folders.
     * @param event 
     */
    folderAction(event: any) {

        // Defining the dialog box content as a result.
        this.resultTitle = "Folder action";
        this.resultMessage = "This is a custom action.";
        this.showDialogWindow();

    }

    /**
     * Showing the dialog window.
     */
    showDialogWindow() {
        if (!this.dialogWindow.nativeElement.showModal) {
            dialogPolyfill.registerDialog(this.dialogWindow.nativeElement);
        }
        if (this.dialogWindow) {
            this.dialogWindow.nativeElement.showModal();
        }
    }

    /**
     * Closing the dialog window.
     */
    closeDialogWindow() {
        if (this.dialogWindow) {
            this.dialogWindow.nativeElement.close();
        }
    }
}