import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Action, changeUserNameAction } from '../actions'
import { ChatState } from '../state'
import {User} from "../models"

const mapStateToProps = (state: ChatState, ownProps: OwnProps): ConnectedState => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
    changeUserName: (user: User) => {
        dispatch(changeUserNameAction(user));
    }
});

interface OwnProps {
    socket: any
}

interface ConnectedState {
    user: User
}

interface ConnectedDispatch {
    changeUserName: (user: User) => void
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
            </form>
        );
    }
}

export const Settings: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
