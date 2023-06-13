import { env } from "process";
import { stringify } from "querystring";
import React, { useState } from "react";

export default class GetNewTask extends React.Component<{}> {
    static displayName = GetNewTask.name;
    private url : string = "http://localhost:5056/api/ToDoTask";

    PostTask = async (data : TodoTask) => {
        var addURL : string = "/add-task";
        const postResponse = await fetch(this.url + addURL,
            {
                method : "POST",
                mode: "cors",
                credentials: "same-origin",
                headers : {
                    "accept" : "/",
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })
            console.log(postResponse);
            return postResponse.json();
    }

    handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.currentTarget;

        const data : TodoTask = {
            id : undefined,
            taskName : target.taskName.value,
            completed : false,
            priority : parseInt(target.taskPriority.value),
            taskDescription : target.taskDescription.value,
            dueDate : (target.taskDueDate.value) ? target.taskDueDate.value : undefined
        }
        this.PostTask(data);
    }

    UserForm = () => {
        // the useState's might be unessisary here
        const [taskName , setTaskName] = useState('');
        const [taskPriority , setTaskPriority] = useState(0);
        const [taskDescription , setTaskDescription] = useState('');
        const [taskDueDate, setTaskDueDate] = useState('');
        

        // takes user input and sends the information to the function 
        return(
            <div className="text-input-container">
                <form className="inline" onSubmit={this.handleSubmit}>
                    <input type="text" id="taskName" onChange={(taskName) => {setTaskName(taskName.target.value)}} value={taskName}/>
                    <input type="number" id="taskPriority" onChange={(taskPriority) => {setTaskPriority(parseInt(taskPriority.target.value))}} value={taskPriority} max={5} min={0}/>
                    <input type="text" id="taskDescription" onChange={(taskDescription) => {setTaskDescription(taskDescription.target.value)}} value={taskDescription}/>
                    <input type="date" id="taskDueDate" onChange={(taskDueDate) => {setTaskDueDate(taskDueDate.target.value)}} value={taskDueDate}/>
                    <button type="submit" className="inline" onClick={
                        () => {this.getUserTask}
                    }>
                        <div>
                            <p>
                                Create new task
                            </p>
                        </div>
                    </button>
                </form>
            </div>
        );
    }

    getUserTask = () => {

    }

    render(): React.ReactNode {

        return(
            <>
                <this.UserForm />
            </>
        )
    }
}