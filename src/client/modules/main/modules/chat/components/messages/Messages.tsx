import * as React from 'react'

import { Message } from "../"
import { AppState, MessageView } from '../../../../../../models'
import { DateType } from '../../../settings/models'
import { connect } from 'react-redux'




const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    dateType: state.settings.dateType,
    language: state.settings.language
})

interface OwnProps {
    clientId: string,
    messages: MessageView[]
    users: any[]
}

interface ConnectedState {
    dateType: DateType,
    language: string
}

interface OwnState {
}

export class MessagesComponent extends React.Component<ConnectedState & OwnProps & OwnState> {

    componentDidUpdate() {
        console.log ('Messages componentDidUpdate()')

        // scroll to the bottom of the element
        const objDiv = document.getElementById('messageList')
        objDiv.scrollTop = objDiv.scrollHeight
    }

    render() {

        // Loop through all the messages and add a Message for each
        const messages = this.props.messages.map((message: MessageView, i: number) => {
            return (
                <Message
                    key={i}
                    dateType={this.props.dateType}
                    language={this.props.language}
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

export const Messages: React.ComponentClass<OwnProps> = connect(mapStateToProps)(MessagesComponent)
