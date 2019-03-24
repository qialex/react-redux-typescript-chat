import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { AppState, User } from '../../../../../../models'
import { L, SocketService } from "../../../../../../utils";
import { Action, changeUserNameAction } from '../../../../../../reducers/actions'
import { ChangeEvent } from 'react'

import './userNameInput.scss'

const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    user: state.user,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
    changeUserName: (user: User) => {
        dispatch(changeUserNameAction(user));
    },
});

interface OwnProps {
    socketService: SocketService
}

interface ConnectedState {
    user: User,
}

interface ConnectedDispatch {
    changeUserName: (user: User) => void
}

interface OwnState {
    username: string,
    isEmpty: boolean,
    isOccupied: boolean,
}

export class UserNameInputComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    state = {
        username: this.props.user && this.props.user.name || '',
        isEmpty: false,
        isOccupied: false,
    }

    componentDidUpdate(prevProps: ConnectedState) {

        // if prop.user.name is changed
        if (this.props.user && this.props.user.name && (!prevProps.user || prevProps.user.name !== this.props.user.name)) {

            this.setState({username: this.props.user.name})
        }
    }

    usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        // TODO: latency

        const value: string = event.target.value

        if (!value) {

            this.setState({ isEmpty: true, username: value })
            return
        }

        this.setState({ username: value, isOccupied: false, isEmpty: false })


        if (value !== this.props.user.name) {
            const user: User = {
                clientId: this.props.user.clientId,
                name: value
            }

            this.props.socketService.socket.emit('userChangeName', user, (result: boolean) => {
                if (result) {
                    this.props.changeUserName(user);
                } else {
                    this.setState({isOccupied: true})
                }
            })
        }
    }

    render() {
        return (
            <div className="user-name-wrapper">
                    <div className="setting-title">{L.userName}:</div>
                    <div className="user-name-input">
                        <div className="validation">
                            { !this.state.isOccupied ? '' :
                                <div>
                                    <div>{L.sorryOccupiedUserName}</div>
                                </div>
                            }
                            { !this.state.isEmpty ? '' :
                                <div>
                                    <div>{L.userNameCantBeEmpty}</div>
                                </div>
                            }
                        </div>
                        <input
                            type="text"
                            onChange={this.usernameChangeHandler}
                            placeholder={L.enterAUserName}
                            value={this.state.username}
                            required />
                    </div>
            </div>
        )
    }
}

export const UserNameInput: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(UserNameInputComponent);
