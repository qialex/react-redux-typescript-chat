import * as React from 'react'
import { MessageView } from '../models'

interface OwnProps {
    key: number,
    message: MessageView
}

interface OwnState {
}

export class Message extends React.Component<OwnProps, OwnState> {

    render() {

        // add css class if message from me
        const fromMe = this.props.message.isFromMe ? 'from-me' : ''

        return (
            <div className={`message ${fromMe}`}>
                <div className='username'>
                    { this.props.message.username }
                </div>
                <div className='timestamp'>
                    { this.props.message.timestamp }
                </div>
                <div className='message-body'>
                    { this.props.message.message }
                </div>
            </div>
        );
    }
}
