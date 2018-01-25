# Alfresco JavaScript API Node.js example

# How this project was created

**If you are interested only in executing it, jump to Start section**

.1 Create a Node.js project

```
$ npm init
```

.2 Install the Alfresco JavaScript API
```
$ npm install --save alfresco-js-api
```

.3 Edit app

```
$ vi index.js
```

.4 Import Alfresco JavaScript API
```
var AlfrescoApi = require('alfresco-js-api');
```

.5 Setup Alfresco JS API Login
Remember to change the host url to point to your services

```
var alfrescoJsApi = new AlfrescoApi({
    hostEcm: 'http://localhost:8888',
    hostBpm: 'http://localhost:8888',
    provider: 'ALL'
});
```

.6 Perform Login
```

alfrescoJsApi.login('admin', 'admin').then(function (data) {
    console.log('API called successfully Login in performed ', data);

}, function (error) {
    console.error(error);
});

```

.7 Call Process API

In the login call back perform call to process

```
    var requestTasks = new alfrescoJsApi.activiti.TaskQueryRequestRepresentation();

    alfrescoJsApi.activiti.taskApi.listTasks(requestTasks).then(function (data) {
        console.log('listTasks ', data);
    }, function (error) {
        console.log('Error', error);
    });
``

.8 Call Content API

In the login call back perform call to content

```
    alfrescoJsApi.core.nodesApi.getNodeChildren('-my-').then(function (data) {
        console.log('requestNodes ', data)
    }, function (error) {
        console.log('Error', error);
    });

```

# Start

```
$ node index.js
```

# Debug

```
$ node --inspect index.js
```

open chrome://inspect
