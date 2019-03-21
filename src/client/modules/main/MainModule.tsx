import * as React from 'react'
import { MainRouter } from "./components"


interface OwnProps {
    socket: SocketIOClient.Socket
}

export class MainModule extends React.Component<OwnProps> {

    render() {
        return (
            <MainRouter socket={this.props.socket}/>
        )
    }
}
