import * as React from 'react'
import { ChatApp } from "./components"


interface OwnProps {
    socket: SocketIOClient.Socket
}

export class ChatModule extends React.Component<OwnProps> {

    render() {
        return (
            <ChatApp socket={this.props.socket}/>
        )
    }
}
