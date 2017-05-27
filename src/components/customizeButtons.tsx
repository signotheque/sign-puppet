import * as React from "react";

export interface CustomizeButton { id: string, label: string };
export interface CustomizeButtonsProps { buttons: Array<CustomizeButton> }

export class CustomizeButtons extends React.Component<CustomizeButtonsProps, undefined> {

    render() {
        return <ul id="customize" className="inline">
            {this.props.buttons.map(item => <li key={item.id}><a href={"#" + item.id}>{item.label}</a></li>
            )}
        </ul>
            ;
    }
}