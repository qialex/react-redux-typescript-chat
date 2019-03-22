import * as React from 'react'
import * as moment from 'moment'
import { MessageView } from '../../../../../../models'
import { DateType } from '../../../settings/models'
import { MessageBody } from '..'


interface OwnProps {
    key: number,
    message: MessageView
    dateType: DateType
    language: string
}

interface OwnState {
}

export class Message extends React.Component<OwnProps, OwnState>{

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

    reRenderByTimeout(): void {
        setTimeout(() => {
            this.forceUpdate()
        }, 15 * 1000)
    }

    render() {

        const momentObject: moment.Moment = moment(this.props.message.timestamp).locale(this.props.language)

        let dateToDisplay: string

        if (Message.isMessageQuiteFresh(momentObject)) {

            dateToDisplay = momentObject.fromNow()

            this.reRenderByTimeout()
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
            <div className={`message ${fromMe}`}>
                { !fromMe ? <div className='username'>
                    { this.props.message.username }
                </div> : '' }
                <div className='timestamp'>
                    { dateToDisplay }
                </div>
                <div className='message-body-wrapper'>
                    <MessageBody message={this.props.message.message} />
                </div>
            </div>
        )
    }
}
