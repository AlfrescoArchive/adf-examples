
export class CustomTaskModel {
    'id': string;
    'name': string;
    'created': Date;
    'dueDate': Date;
    'endDate': Date;
    'assignee': {
         'id': string;
         'firstName': string;
         'lastName': string;
    };
}
