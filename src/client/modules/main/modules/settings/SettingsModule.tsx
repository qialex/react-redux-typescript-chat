import * as React from 'react'
import { Settings } from "./components"
import {SocketService} from "../../../../utils";


interface OwnProps {
    socketService: SocketService
}

export class SettingsModule extends React.Component<OwnProps> {

    render() {
        return (
            <Settings socketService={this.props.socketService}/>
        )
    }
}
