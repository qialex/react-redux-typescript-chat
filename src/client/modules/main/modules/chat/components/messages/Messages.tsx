import * as React from 'react'
import { connect } from 'react-redux'

import { Message } from "../"
import { AppState, Message as IeMessage } from '../../../../../../models'
import { DateType } from '../../../settings/models'

import './messages.scss'

const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    dateType: state.settings.dateType,
    language: state.settings.language
})

interface OwnProps {
    clientId: string,
    messages: IeMessage[]
}

interface ConnectedState {
    dateType: DateType,
    language: string
}

export class MessagesComponent extends React.Component<ConnectedState & OwnProps> {

    componentDidUpdate() {
        // scroll to the bottom of the element
        const el: HTMLElement = document.querySelector('.messages-wrapper')

        if(el) {
            el.scrollTop = el.scrollHeight
        }

    }

    render() {

        // Loop through all the messages and add a Message for each
        const messages = this.props.messages.map((message: IeMessage, i: number) => {
            return (
                <Message
                    key={i}
                    dateType={this.props.dateType}
                    language={this.props.language}
                    message={message} />
            )
        })

        return (
            <div className='messages-wrapper'>
                { messages }
            </div>
        )
    }
}

export const Messages: React.ComponentClass<OwnProps> = connect(mapStateToProps)(MessagesComponent)
