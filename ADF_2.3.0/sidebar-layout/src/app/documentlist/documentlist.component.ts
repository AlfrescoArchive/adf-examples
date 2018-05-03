import { Component, ViewChild, Input } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { DocumentListComponent } from '@alfresco/adf-content-services';

@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.css']
})
export class DocumentlistComponent {

  @Input()
  showViewer: boolean = false;

  nodeId: string = null;

  @ViewChild('documentList')
  documentList: DocumentListComponent;

  constructor(private notificationService: NotificationService) { }

  uploadSuccess(event: any) {
    this.notificationService.openSnackMessage('File uploaded');
    this.documentList.reload();
  }

  showPreview(event) {
    this.showViewer = false;
    if (event.value.entry.isFile) {
      this.nodeId = event.value.entry.id;
      this.showViewer = true;
    }
  }

  onGoBack(event: any) {
    this.showViewer = false;
    this.nodeId = null;
  }

}
