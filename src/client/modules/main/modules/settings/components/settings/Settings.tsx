import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Action, changeCtrlEnterAction, changeDateTypeAction, changeThemeAction } from '../../redusers/actions'
import { AppState, User } from '../../../../../../models'
import { DateType, Settings as IeSettings, Theme } from "../../models"
import { LanguageSelect, ResetButton } from "../";
import { L }from "../../../../../../utils";
import { Action as AppAction, changeUserNameAction } from '../../../../../../reducers/actions'
import { ChangeEvent } from 'react'


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

    themeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        // setting theme
        this.props.changeTheme(event.target.value as Theme)
    }

    dateTypeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        // setting dateType
        this.props.changeDateType(event.target.value as DateType)
    }

    ctrlEnterChangeHandler = (ctrlEnter: boolean) => {

        // setting ctrlEnter
        this.props.changeCtrlEnter(ctrlEnter)
    }

    usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

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
            <form className="username-container">
                <h1>Settings</h1>
                <div>User name:</div>
                <div>
                    <input
                        type="text"
                        onChange={this.usernameChangeHandler}
                        placeholder="Enter a username..."
                        value={this.state.username}
                        required />
                </div>
                { this.state.isValid ? '' : <div>
                    <b>{this.state.username}</b> is occupied. Your name is still <b>{this.props.user.name}</b>
                </div> }


                <div>
                    <div>Interface color:</div>
                    <label><input type="radio" name='skin' value='light' checked={this.props.settings.theme === "light"} onChange={this.themeChangeHandler} /> Light</label>
                    <label><input type="radio" name='skin' value='dark' checked={this.props.settings.theme === "dark"} onChange={this.themeChangeHandler} /> Dark</label>
                </div>

                <div>
                    <div>Clock display:</div>
                    <label><input type="radio" name='dateType' value={DateType.h12} checked={this.props.settings.dateType === DateType.h12} onChange={this.dateTypeChangeHandler} /> 12 Hours</label>
                    <label><input type="radio" name='dateType' value={DateType.h24} checked={this.props.settings.dateType === DateType.h24} onChange={this.dateTypeChangeHandler} /> 24 Hours</label>
                </div>

                <div>
                    <div>Send message on CTRL+ENTER</div>
                    <label><input type="radio" name='ctrlEnter' checked={this.props.settings.ctrlEnter} onChange={this.ctrlEnterChangeHandler.bind(this, true)} /> On</label>
                    <label><input type="radio" name='ctrlEnter' checked={!this.props.settings.ctrlEnter} onChange={this.ctrlEnterChangeHandler.bind(this, false)} /> Off</label>
                </div>

                <div>
                    <div>{L.language}</div>
                    <LanguageSelect />
                </div>

                <div className="reset-button-wrapper">
                    <ResetButton language={this.props.settings.language} />
                </div>

            </form>
        );
    }
}

export const Settings: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
