type TaskSubmissionData = {
    taskName : string
}

type TaskDisplayData = {
    isDataLoaded : boolean,
    data : Array<TodoTask>
}


type TodoTask = {
    id : string | undefined,
    taskName : string,
    priority : number,
    taskDescription : string | undefined,
    dueDate : Date | string | undefined
}