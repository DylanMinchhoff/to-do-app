type TaskSubmissionData = {
    taskName : string
}

type TaskDisplayData = {
    isDataLoaded : boolean,
    data : Array<TodoTask>
}

type TodoTask = {
    id : number | undefined
    taskName : string,
    taskPriority : number,
    taskDescription : string | undefined,
    taskDueDate : Date | undefined
}