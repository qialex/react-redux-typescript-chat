import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Action, changeCtrlEnterAction, changeDateTypeAction, changeThemeAction } from '../../redusers/actions'
import { AppState, User } from '../../../../../../models'
import { DateType, Settings as IeSettings, Theme } from "../../models"
import {LanguageSelect, RadioButton, ResetButton} from "../";
import { L }from "../../../../../../utils";
import { Action as AppAction, changeUserNameAction } from '../../../../../../reducers/actions'
import { ChangeEvent } from 'react'

import './settings.scss'

const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    user: state.user,
    settings: state.settings,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action | AppAction>): ConnectedDispatch => ({
    changeUserName: (user: User) => {
        dispatch(changeUserNameAction(user));
    },
    changeTheme: (theme: Theme) => {
        dispatch(changeThemeAction(theme));
    },
    changeDateType: (dateType: DateType) => {
        dispatch(changeDateTypeAction(dateType));
    },
    changeCtrlEnter: (ctrlEnter: boolean) => {
        dispatch(changeCtrlEnterAction(ctrlEnter));
    }
});

interface OwnProps {
    socket: SocketIOClient.Socket
}

interface ConnectedState {
    user: User,
    settings: IeSettings,
}

interface ConnectedDispatch {
    changeUserName: (user: User) => void
    changeTheme: (theme: Theme) => void
    changeDateType: (dateType: DateType) => void
    changeCtrlEnter: (ctrlEnter: boolean) => void
}

interface OwnState {
    username: string,
    isValid: boolean,
}

export class SettingsComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    state = {
        username: this.props.user && this.props.user.name || '',
        isValid: true
    }

    componentDidUpdate(prevProps: ConnectedState) {

        // if prop.user.name is changed
        if (this.props.user && this.props.user.name && (!prevProps.user || prevProps.user.name !== this.props.user.name)) {

            this.setState({username: this.props.user.name})
        }
    }

    themeChangeHandler(event: ChangeEvent<HTMLInputElement>): void {

        // setting theme
        this.props.changeTheme(event.target.value as Theme)
    }

    dateTypeChangeHandler(event: ChangeEvent<HTMLInputElement>): void {

        // setting dateType
        this.props.changeDateType(event.target.value as DateType)
    }

    ctrlEnterChangeHandler(ctrlEnter: boolean): void {

        // setting ctrlEnter
        this.props.changeCtrlEnter(ctrlEnter)
    }

    usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        // TODO: latency

        const value = event.target.value

        this.setState({ username: value, isValid: true  })


        if (value !== this.props.user.name) {
            const user: User = {
                clientId: this.props.user.clientId,
                name: value
            }

            this.props.socket.emit('userChangeName', user, (result: boolean) => {
                if (result) {
                    this.props.changeUserName(user);
                } else {
                    this.setState({isValid: false})
                }
            })
        }
    }

    render() {
        return (
            <div className="settings-wrapper">
                <div className="setting-item">
                    <div className="setting-title">{L.userName}:</div>
                    <div>
                        <input
                            type="text"
                            onChange={this.usernameChangeHandler}
                            placeholder={L.enterAUserName}
                            value={this.state.username}
                            required />
                    </div>
                    { this.state.isValid ? '' : <div className="validation">
                        <div>{L.occupiedUserName}: <b>{this.state.username}</b></div>
                        <div>{L.userNameIsStill} <b>{this.props.user.name}</b></div>
                    </div> }
                </div>

                <div className="setting-item">
                    <div className="setting-title">{L.interfaceColor}:</div>
                    <div className="setting-values">
                        <RadioButton
                            name='skin'
                            checked={this.props.settings.theme === Theme.light}
                            value={Theme.light}
                            label={L.light}
                            onChange={this.themeChangeHandler.bind(this)}/>
                        <RadioButton
                            name='skin'
                            checked={this.props.settings.theme === Theme.dark}
                            value={Theme.dark}
                            label={L.dark}
                            onChange={this.themeChangeHandler.bind(this)}/>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-title">{L.clockDisplay}:</div>
                    <div className="setting-values">
                        <RadioButton
                            name='dateType'
                            checked={this.props.settings.dateType === DateType.h12}
                            value={DateType.h12}
                            label={L.h12}
                            onChange={this.dateTypeChangeHandler.bind(this)}/>
                        <RadioButton
                            name='dateType'
                            checked={this.props.settings.dateType === DateType.h24}
                            value={DateType.h24}
                            label={L.h24}
                            onChange={this.dateTypeChangeHandler.bind(this)}/>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-title">{L.sendMessageOn} CTRL+ENTER</div>
                    <div className="setting-values">
                        <RadioButton
                            name='ctrlEnter'
                            checked={this.props.settings.ctrlEnter}
                            value={'true'}
                            label={L.on}
                            onChange={this.ctrlEnterChangeHandler.bind(this, true)}
                        />
                        <RadioButton
                            name='ctrlEnter'
                            checked={!this.props.settings.ctrlEnter}
                            value={'false'}
                            label={L.off}
                            onChange={this.ctrlEnterChangeHandler.bind(this, false)}
                        />
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-title">{L.language}</div>
                    <LanguageSelect />
                </div>

                <div className="setting-item">
                    <ResetButton language={this.props.settings.language} />
                </div>

            </div>
        )
    }
}

export const Settings: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
