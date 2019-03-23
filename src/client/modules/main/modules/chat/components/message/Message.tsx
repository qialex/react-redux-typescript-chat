import * as React from 'react'
import * as moment from 'moment'
import { Message as IeMessage } from '../../../../../../models'
import { DateType } from '../../../settings/models'
import { MessageBody } from '..'

import './message.scss'


interface OwnProps {
    key: number,
    message: IeMessage
    dateType: DateType
    language: string
}

interface OwnState {
    timeout: number
}

export class Message extends React.Component<OwnProps, OwnState>{

    state: OwnState = {
        timeout: undefined
    }

    static isMessageQuiteFresh(momentObject: moment.Moment): boolean {

        // moment.fromNow will be applied if message was sent less than 3 minutes till now
        const diff: number = 3 * 60 * 1000

        return momentObject.diff(moment()) > -diff
    }

    static isMomentToday(momentObject: moment.Moment): boolean {

        // if message was sent in during day
        return momentObject.diff(moment(), 'days') === 0
    }

    static isMomentInThisYear(momentObject: moment.Moment): boolean {

        // if message was sent in during year
        return momentObject.diff(moment(), 'years') === 0
    }

    componentDidUpdate(prevProps: Readonly<OwnProps>, prevState: Readonly<OwnState>, snapshot?: any): void {

        const momentObject: moment.Moment = moment(this.props.message.timestamp).locale(this.props.language)

        // if message was sent a short time ago
        if (Message.isMessageQuiteFresh(momentObject) && !this.state.timeout) {

            this.reRenderByTimeout()
        }
    }

    componentWillUnmount(): void {

        if (this.state.timeout) {

            // clearing timeout
            clearTimeout(this.state.timeout)
        }
    }

    reRenderByTimeout(): void {

        // will refresh component in 15 seconds
        const timeout: number = window.setTimeout(() => {
            this.forceUpdate()
        }, 15 * 1000)

        // saving timeout to state
        this.setState({timeout})
    }

    render() {

        const momentObject: moment.Moment = moment(this.props.message.timestamp).locale(this.props.language)

        let dateToDisplay: string

        if (Message.isMessageQuiteFresh(momentObject)) {

            dateToDisplay = momentObject.fromNow()

        } else {

            let format = this.props.dateType === DateType.h12 ? 'h:mm a' : 'HH:mm'

            if (!Message.isMomentInThisYear(momentObject)) {

                format = 'D MMM YYYY ' + format

            } else if (!Message.isMomentToday(momentObject)) {

                format = 'D MMM ' + format
            }

            dateToDisplay = momentObject.format(format)
        }

        // add css class if message from me
        const fromMe = this.props.message.isFromMe ? 'from-me' : ''

        return (
            <div className="message-wrapper">
                <div className={`message ${fromMe}`}>
                    <div className="top-line">
                        { !fromMe ? <div className='username'>
                            { this.props.message.user.name },
                        </div> : '' }
                        <div className='date-time'>
                            { dateToDisplay }
                        </div>
                    </div>
                    <div className='message-body-wrapper'>
                        <MessageBody message={this.props.message.message} />
                    </div>
                </div>
            </div>
        )
    }
}
