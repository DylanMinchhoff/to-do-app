import React from "react";

export default class DisplayTask extends React.Component<{}, TaskDisplayData> {
    static displayName = DisplayTask.name;

    constructor(props: TaskDisplayData) {
        super(props);
        this.state = {
            isDataLoaded : false,
            data : []
        }
    }

    getTasks = async () => {
        var url: string = "http://localhost:5056/api/ToDoTask";
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
        })
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            this.setState({isDataLoaded : false})
        })
        this.setState({
            isDataLoaded : true,
            data : response
        })
        console.log(response);
    }

    render(): React.ReactNode {
        // if (!this.state.isDataLoaded) this.getTasks();
        return(
            <>
                <div className="displayTasks-container">
                    <div></div>
                    <div>
                        <p>filler text</p>
                    </div>
                    <div></div>
                </div>
            </>
        )
    }
}