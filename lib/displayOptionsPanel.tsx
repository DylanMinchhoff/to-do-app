import React from "react";
import { LeftPanelReload } from "./leftPanelReload";

export default class DisplayOptionsPanel extends React.Component<{}> {
    static displayName = DisplayOptionsPanel.name;

    render(): React.ReactNode {
        return(
        <div>
            <ul>
                <li>
                    <LeftPanelReload/>
                </li>
            </ul>
        </div>
        )
    }
}