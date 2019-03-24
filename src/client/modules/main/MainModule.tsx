import * as React from 'react'
import { MainRouter } from "./components"
import { SocketService } from "../../utils";


interface OwnProps {
    socketService: SocketService
}

export class MainModule extends React.Component<OwnProps> {

    render() {
        return (
            <MainRouter socketService={this.props.socketService}/>
        )
    }
}
