import { time } from "console";
import React from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

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
        return(
            <div className="task-conatiner">
                <div className="task-container-overlay">
                    <div className="taskCard-checkbox">
                        <form className="task-checkbox">
                            <input type="checkbox" className="task-checkbox"></input>
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
            console.log(deleteResponse);
    }

    getTasks = async () => {
        var url: string = "http://localhost:5056/api/ToDoTask";
        const GETResponse = await fetch(url, {
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