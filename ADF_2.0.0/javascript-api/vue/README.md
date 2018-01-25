# Alfresco JavaScript API Vue example

# How this project was created

**If you are interested only in executing it, jump to Start section**

This project was generated with [Vue CLI](https://github.com/vuejs/vue-cli)

.1 Create a Vue project

```
$ npm install -g vue-cli
$ vue init webpack adf-vue

```

.2 Install the Alfresco JavaScript API
```
$ npm install --save alfresco-js-api
```

.3 Edit app

```
$ vi src/app/app.component.ts
```

.4 Import Alfresco JavaScript API
```
import * as AlfrescoApi from 'alfresco-js-api';
```

.5 Setup Alfresco JS API Login
Remember to change the host url to point to your services

```
    const alf = new AlfrescoApi({
        hostEcm: 'http://localhost:8888',
        hostBpm: 'http://localhost:8888',
        provider: 'ALL'
    });
```

**Note: If you have csrf problems, please check the following article**
https://community.alfresco.com/community/application-development-framework/blog/2017/06/20/adf-cors-solving-strategies


.6 Perform Login
```

    this.alf.login('admin', 'admin').then(data => {
        console.log('API called successfully Login in performed ', data);
      },
      error => {
        console.log('Error', error);
      }
    );

```

.7 Call Process API

In the login call back perform call to process

```
    const requestTasks = new this.alf.activiti.TaskQueryRequestRepresentation();

    this.alf.activiti.taskApi.listTasks(requestTasks).then(data => {
      console.log('listTasks ', data);
      this.tasks = data.data;
    },
    error => {
      console.log('Error', error);
    });
``

.8 Call Content API

In the login call back perform call to content

```
    this.alf.core.nodesApi.getNodeChildren('-my-').then(data => {
      console.log('requestNodes ', data);
      this.files = data.list.entries;
    },
    error => {
      console.log('Error', error);
    });

```

.9 Edit template
Iterate over the API data

``` javascript

<table v-if="tasks && tasks.length" align="center" border={1}>
  <tr v-for="task of tasks">
    <td>{{task.id}}</td>
    <td>{{task.name}}</td>
  </tr>
</table>

<table v-if="files && files.length" align="center" border={1}>
  <tr v-for="file of files">
    <td>{{file.entry.id}}</td>
    <td>{{file.entry.name}}</td>
  </tr>
</table>

```

# Start

```
$ npm start
```
