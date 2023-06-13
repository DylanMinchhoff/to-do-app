import React, { useState } from "react";

export default class DisplayTask extends React.Component<{}, TaskDisplayData> {
    static displayName = DisplayTask.name;
    private url : string = "http://localhost:5056/api/ToDoTask";

    constructor(props: TaskDisplayData) {
        super(props);
        this.state = {
            isDataLoaded : false,
            data : []
        }
    }

    RenderError = () : JSX.Element => {
        return(
            <div>
                <h1>An error has occured when trying to fetch tasks</h1>
            </div>
        )
    }

    RenderTasks = () : JSX.Element => {
        const data = this.state.data;
        
        return(
            <>
                {data.map(task => 
                    <this.RenderTask key={task.id} task={task}/>
                )}
            </>
        )
    }

    RenderTask = ({task} : {task : TodoTask}) : JSX.Element => {
        var date : Date = (task.dueDate) ? new Date(task.dueDate) : new Date;
        var dateString : string = `${date.getMonth()} ${date.getDay()} ,${date.getFullYear()}`;

        const determineColor = (completed : Boolean) => {
            var baseClasses = "task-container-overlay ";
            if (completed) return (baseClasses + "task-container-overlay-complete");
            else return baseClasses + "task-container-overlay-noncomplete";
        }
        
        var taskCardClasses = determineColor(task.completed);

        const handleComplete = (e : any) => {
            e.preventDefault();
            task.completed = !task.completed;
            this.editTask(task);
            this.setState({});
        }
        return(
            <div className="task-conatiner">
                <div className={taskCardClasses}>
                    <div className="taskCard-checkbox">
                        <form className="task-checkbox" >
                            <button onClick={(e) => {handleComplete(e)}} className="task-checkbox-button">Complete Task</button>
                            <p>{`Done: ${(task.completed ? "yes" : "no")}`}</p>
                        </form>
                    </div>
                    <div className="taskCard-info">
                        <ul>
                            <li>
                                {`Task name: ${task.taskName}`}
                            </li>
                            <li>
                                {`Task description: ${task.taskDescription}`}
                            </li>
                        </ul>
                    </div>
                    <div className="taskCard-dueDate">
                        <ul>
                            <li>
                                {`Duedate: ${dateString}`}
                            </li>
                            <li>
                                {`Priority: ${task.priority}`}
                            </li>
                        </ul>
                    </div>
                    <div className="taskCard-options">
                        <button className="inline">
                            Edit
                        </button>
                        <button className="inline" onClick={() => {this.deleteTask(task.id)}}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    

    deleteTask = async (id : string | undefined) => {
        var deleteUrl : string = `${this.url}?id=${id}`
        const deleteResponse = await fetch(deleteUrl,
            {
                method : "DELETE",
                mode: "cors",
                headers : {
                    "accept" : "/"
                },
                body : id
            })
            .then(() => {
                this.setState({
                    data : this.state.data.filter((value, index, array) => {
                        return value.id != id;
                    })
                })
            })
            console.log(deleteResponse);
    }

    editTask = async (task : TodoTask) => {
        // this prevents the reload of the page from interfering with the data being sent
        var editURL : string = "/edit-task";
        const EDITResponse = await fetch(this.url + editURL, {
            method : "POST",
                mode: "cors",
                headers : {
                    "accept" : "/",
                    "content-type" : "application/json"
                },
                body : JSON.stringify(task)
        })
        console.log(EDITResponse, task.completed);
    }

    getTasks = async () => {
        const GETResponse = await fetch(this.url, {
            method: "GET",
            mode: "cors",
        })
        .then(response => response.json())
        .then(response => 
            this.setState({
                isDataLoaded : true,
                data : response
            })
        )
        .catch(error => {
            console.log(error);
            this.setState({isDataLoaded : false})
        })
    }

    render(): React.ReactNode {
        if (!this.state.isDataLoaded) this.getTasks();
        
        if(this.state.isDataLoaded) {
            return(
                <>
                    <div className="displayTasks-container">
                        <div></div>
                        <div>
                            <this.RenderTasks/>
                        </div>
                        <div></div>
                    </div>
                </>
            )
        }
        else {
            return(
                <>
                    <div className="displayTasks-container">
                        <div></div>
                        <div>
                            <this.RenderError/>
                        </div>
                        <div></div>
                    </div>
                </>
            )
        }
        
    }
}