import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Action } from '../../../../reducers/actions'
import { AppState } from '../../../../models'


import { HashRouter, Route, withRouter } from "react-router-dom"
import { TopMenu } from "../"



import { SettingsModule } from "../../modules/settings"
import { ChatModule } from "../../modules/chat"
import { Settings } from '../../modules/settings/models'
import { L } from '../../../../utils'

const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    settings: state.settings
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
})

interface OwnProps {
    socket: SocketIOClient.Socket
}

interface ConnectedState {
    settings: Settings
}

interface ConnectedDispatch {
}

interface OwnState {
}

const TopMenuWithRouter = withRouter(props => <TopMenu {...props}/>)

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
                <TopMenuWithRouter />
                <Route path="/" render={() => <ChatModule socket={this.props.socket} />} />
                <Route path="/settings" render={()=> <SettingsModule socket={this.props.socket}/>} />
            </HashRouter>
        )
    }
}

export const MainRouter: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
