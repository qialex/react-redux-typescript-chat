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
import {L, SocketService} from '../../../../utils'

import './MainRouter.scss'

const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    settings: state.settings
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
})

interface OwnProps {
    socketService: SocketService
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
                <div className="app-routes">
                    <Route exact path="/" render={() => <ChatModule socketService={this.props.socketService} />} />
                    <Route path="/settings" render={()=> <SettingsModule socketService={this.props.socketService}/>} />
                </div>
            </HashRouter>
        )
    }
}

export const MainRouter: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
