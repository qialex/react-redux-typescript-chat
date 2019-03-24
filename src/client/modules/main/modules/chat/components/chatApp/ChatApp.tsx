import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'


import { Action, addMessageAction } from '../../../../../../reducers/actions'

import { Messages } from '../'
import { ChatInput } from '../'
import { AppState, Message, User } from '../../../../../../models'

import './chatApp.scss'


const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    messages: state.messages,
    user: state.client && state.client.user,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
    addMessage: (message: Message) => {
        dispatch(addMessageAction(message))
    }
})

interface OwnProps {
    socket: SocketIOClient.Socket,
}

interface ConnectedState {
    messages: Message[],
    user: User,
}

interface ConnectedDispatch {
    addMessage: (message: Message) => void
}

interface OwnState {
}

export class ChatAppComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    sendHandler = (messageText: string) => {
        const message: Message = {
            user: this.props.user,
            timestamp: new Date().getTime(),
            message: messageText,
        }

        this.props.socket.send(message, (result: boolean)=> {
            if (result) {
                this.props.addMessage(message)
            }
        })
    }

    render() {
        return (
            <div className="chat-wrapper">
                <Messages clientId={this.props.user && this.props.user.id || ''} messages={this.props.messages} />
                <ChatInput onSend={this.sendHandler} />
            </div>
        )
    }
}

export const ChatApp: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(ChatAppComponent)
