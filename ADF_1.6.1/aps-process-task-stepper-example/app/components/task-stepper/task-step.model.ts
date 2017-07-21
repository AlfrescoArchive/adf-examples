
export class TaskStepModel {
    name: string;
    assigneeName: string;
    isAssignedToCurrentUser: boolean;
    createdDate: Date;
    dueDate: Date;
    completedDate: Date;
    isComplete: boolean;
    isSelected: boolean;
    taskId: string;
}
