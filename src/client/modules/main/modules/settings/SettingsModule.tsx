import * as React from 'react'
import { Settings } from "./components"


interface OwnProps {
    socket: SocketIOClient.Socket
}

export class SettingsModule extends React.Component<OwnProps> {

    render() {
        return (
            <Settings socket={this.props.socket}/>
        )
    }
}
