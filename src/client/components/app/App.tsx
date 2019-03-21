import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Action } from '../../actions'
import { ChatState } from '../../state'

import { ChatApp } from '../ChatApp'
import { HashRouter, Route } from "react-router-dom"
import { Menu } from "../Menu"
import { Settings } from "../Settings"
import { Settings as IeSettings } from "../../models"
import L from "../../localization/localizedStrings";

const mapStateToProps = (state: ChatState, ownProps: OwnProps): ConnectedState => ({
    settings: state.settings
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
})

interface OwnProps {
    socket: any
}

interface ConnectedState {
    settings: IeSettings
}

interface ConnectedDispatch {
}

interface OwnState {
}

export class AppComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    componentWillMount() {

        // setting language
        L.setLanguage(this.props.settings.language)

        // adding theme
        document.body.classList.add(`theme-${this.props.settings.theme}`)
    }

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
