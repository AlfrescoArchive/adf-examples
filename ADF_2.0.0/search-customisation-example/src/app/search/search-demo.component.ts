import { Component, ViewEncapsulation } from '@angular/core';
import { ThumbnailService } from '@alfresco/adf-core';
import { MinimalNodeEntity } from 'alfresco-js-api';

@Component({
  selector: 'app-custom-search',
  templateUrl: './search-demo.component.html',
  styleUrls: ['./search-demo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchDemoComponent {

  searchTerm = '';

  constructor(private thumbnailService: ThumbnailService) { }


  getMimeTypeIcon(node: MinimalNodeEntity): string {
    let mimeType;

    if (node.entry.content && node.entry.content.mimeType) {
      mimeType = node.entry.content.mimeType;
    }
    if (node.entry.isFolder) {
      mimeType = 'folder';
    }

    return this.thumbnailService.getMimeTypeIcon(mimeType);
  }

  onClick(item: MinimalNodeEntity) {
     alert(' CLICKED ELEMENT ' + item.entry.name);
  }

}
