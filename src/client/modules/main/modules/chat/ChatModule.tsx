import * as React from 'react'
import { ChatApp } from "./components"
import {SocketService} from "../../../../utils";


interface OwnProps {
    socketService: SocketService
}

export class ChatModule extends React.Component<OwnProps> {

    render() {
        return (
            <ChatApp socketService={this.props.socketService}/>
        )
    }
}
