import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Action, changeThemeAction, changeUserNameAction } from '../actions'
import { ChatState } from '../state'
import { Settings as IeSettings, User } from "../models"
import { LanguageSelect } from "./languageSelect/LanguageSelect";
import L from "../localization/localizedStrings";

const mapStateToProps = (state: ChatState, ownProps: OwnProps): ConnectedState => ({
    user: state.user,
    settings: state.settings,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
    changeUserName: (user: User) => {
        dispatch(changeUserNameAction(user));
    },
    changeTheme: (theme: string) => {
        dispatch(changeThemeAction(theme));
    }
});

interface OwnProps {
    socket: any
}

interface ConnectedState {
    user: User,
    settings: IeSettings,
}

interface ConnectedDispatch {
    changeUserName: (user: User) => void
    changeTheme: (theme: string) => void
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

    themeChangeHandler = (event: any) => {

        // setting theme
        this.props.changeTheme(event.target.value)
    }

    usernameChangeHandler = (event: any) => {

        this.setState({ username: event.target.value, isValid: true  });


        if (event.target.value !== this.props.user.name) {
            const user: User = {
                clientId: this.props.user.clientId,
                name: event.target.value
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
                    <label><input type="radio" name='clockDisplay' value='12h' /> 12 Hours</label>
                    <label><input type="radio" name='clockDisplay' value='24h' /> 24 Hours</label>
                </div>

                <div>
                    <div>Send message on CTRL+ENTER</div>
                    <label><input type="radio" name='clockDisplay' value='on' /> On</label>
                    <label><input type="radio" name='clockDisplay' value='off' /> Off</label>
                </div>

                <div>
                    <div>{L.language}</div>
                    <LanguageSelect />
                </div>

            </form>
        );
    }
}

export const Settings: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
