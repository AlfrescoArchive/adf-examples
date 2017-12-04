import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { SearchComponent } from '@alfresco/adf-content-services';

@Component({
  selector: 'app-custom-search',
  templateUrl: './search-demo.component.html',
  styleUrls: ['./search-demo.component.css']
})
export class SearchDemoComponent implements OnInit {

  searchTerm = '';

  ngOnInit() {
  }
}
