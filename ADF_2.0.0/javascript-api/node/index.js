var AlfrescoApi = require('alfresco-js-api');


var alfrescoJsApi = new AlfrescoApi({
    hostEcm: 'http://localhost:8888',
    hostBpm: 'http://localhost:8888',
    provider: 'ALL'
});

alfrescoJsApi.login('admin', 'admin').then(function (data) {

    console.log('API called successfully Login in performed ', data);

    var requestTasks = new alfrescoJsApi.activiti.TaskQueryRequestRepresentation();

    alfrescoJsApi.activiti.taskApi.listTasks(requestTasks).then(function (data) {
        console.log('listTasks ', data);
    }, function (error) {
        console.log('Error', error);
    });

    alfrescoJsApi.core.nodesApi.getNodeChildren('-my-').then(function (data) {
        console.log('requestNodes ', data)
    }, function (error) {
        console.log('Error', error);
    });

}, function (error) {
    console.error(error);
});
