import { env } from "process";
import { stringify } from "querystring";
import React, { useState } from "react";

export default class GetNewTask extends React.Component<{}> {
    static displayName = GetNewTask.name;

    PostTask = async (data : string) => {
        var url : string = "http://localhost:5056/api/ToDoTask";
        const postResponse = await fetch(url,
            {
                method : "POST",
                mode: "cors",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : data
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
            taskPriority : target.taskPriority.value,
            taskDescription : target.taskDescription.value,
            taskDueDate : (target.taskDueDate.value) ? target.taskDueDate : undefined
        }
        console.log(data);
        this.PostTask(JSON.stringify(data));
    }

    UserForm = () => {
        // the useState's might be unessisary here
        const [taskName , setTaskName] = useState('');
        const [taskPriority , setTaskPriority] = useState(3);
        const [taskDescription , setTaskDescription] = useState('');
        const [taskDueDate, setTaskDueDate] = useState('');
        

        // takes user input and sends the information to the function 
        return(
            <div className="text-input-container">
                <form className="inline" onSubmit={this.handleSubmit}>
                    <input type="text" id="taskName" onChange={(taskName) => {setTaskName(taskName.target.value)}} value={taskName}/>
                    <input type="number" id="taskPriority" onChange={(taskPriority) => {setTaskPriority(parseInt(taskPriority.target.value))}} value={taskPriority}/>
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