import { Component } from '@angular/core';
import * as AlfrescoApi from 'alfresco-js-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alf;

  files = [];

  tasks = [];

  constructor() {
    this.alf = new AlfrescoApi({
      hostEcm: 'http://localhost:8888',
      hostBpm: 'http://localhost:8888',
      provider: 'ALL'
    });

    this.login();
  }

  login() {
    this.alf.login('admin', 'admin').then(data => {
        console.log('API called successfully Login in performed ', data);

        this.getTasks();

        this.getFiels();
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  getFiels() {
    this.alf.core.nodesApi.getNodeChildren('-my-').then(data => {
        console.log('requestNodes ', data);
        this.files = data.list.entries;
      },
      error => {
        console.log('Error', error);
      });
  }

  getTasks() {
    const requestTasks = new this.alf.activiti.TaskQueryRequestRepresentation();

    this.alf.activiti.taskApi.listTasks(requestTasks).then(data => {
        console.log('listTasks ', data);
        this.tasks = data.data;
      },
      error => {
        console.log('Error', error);
      });
  }

}
