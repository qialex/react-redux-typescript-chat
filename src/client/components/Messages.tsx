import * as React from 'react'

import { Message } from "./Message"
import { MessageView } from "../models"


interface OwnProps {
    clientId: string,
    messages: MessageView[]
    users: any[]
}

interface OwnState {
}

export class Messages extends React.Component<OwnProps, OwnState> {

    render() {
        // console.log('Messages render()')
        // console.log(this.props.users)

        // Loop through all the messages and add a Message for each
        const messages = this.props.messages.map((message: MessageView, i: number) => {
            return (
                <Message
                    key={i}
                    message={message} />
            )
        })

        return (
            <div className='messages' id='messageList'>
                { messages }
            </div>
        )
    }
}
