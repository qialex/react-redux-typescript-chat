import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Action } from '../actions'
import { ChatState } from '../state'

import { ChatApp } from './ChatApp'
import { HashRouter, Route } from "react-router-dom"
import { Menu } from "./Menu"
import { Settings } from "./Settings"


const mapStateToProps = (state: ChatState, ownProps: OwnProps): ConnectedState => ({
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
})

interface OwnProps {
    socket: any
}

interface ConnectedState {
}

interface ConnectedDispatch {
}

interface OwnState {
}

export class AppComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    render() {
        return (
            <HashRouter>
                <Menu />
                <Route path="/" render={() => <ChatApp socket={this.props.socket} />} />
                <Route path="/settings" render={()=> <Settings socket={this.props.socket}/>} />
            </HashRouter>
        )
    }
}

export const App: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
