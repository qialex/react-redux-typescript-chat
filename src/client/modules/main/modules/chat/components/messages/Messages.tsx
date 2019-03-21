import * as React from 'react'

import { Message } from "../"
import { MessageView } from '../../../../../../models'



interface OwnProps {
    clientId: string,
    messages: MessageView[]
    users: any[]
}

interface OwnState {
}

export class Messages extends React.Component<OwnProps, OwnState> {

    componentDidUpdate() {
        console.log ('Messages componentDidUpdate()')

        // scroll to the bottom of the element
        const objDiv = document.getElementById('messageList')
        objDiv.scrollTop = objDiv.scrollHeight
    }

    render() {
        console.log('Messages render()')
        console.log(this.props.users)

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
