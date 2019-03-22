import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

import { AppState, Message } from '../../../../models'
import * as redux from 'redux'
import { Action, markAllMessagesReadAction } from '../../../../reducers/actions'


const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    messages: state.messages
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
    markAllMessagesRead: () => {
        dispatch(markAllMessagesReadAction())
    }
})

interface OwnProps {
    location: any,
}

interface ConnectedState {
    messages: Message[]
}

interface ConnectedDispatch {
    markAllMessagesRead: () => void
}

export class TopMenuComponent extends React.Component<OwnProps & ConnectedState & ConnectedDispatch> {

    componentDidUpdate(prevProps: OwnProps): void {

        if (this.props.location !== prevProps.location) {

            this.onRouteChanged()
        }
    }

    getUnreadMessagesCount(): number {
        return (this.props.messages || []).filter((message: Message) => !message.isRead).length
    }

    onRouteChanged(): void {

        if (this.getUnreadMessagesCount()) {

            // mark all messages as read
            this.props.markAllMessagesRead()
        }
    }

    render() {
        const unreadMessagesCount: number = this.getUnreadMessagesCount()

        return (
            <span>
                <Link to="/">
                    Chat
                    { unreadMessagesCount ? <span className="unread-message-count"> ({unreadMessagesCount}) </span> : '' }
                </Link>
                <Link to="/settings">Settings</Link>
            </span>
        )
    }
}
export const TopMenu: React.ComponentClass<Pick<OwnProps & ConnectedState & ConnectedDispatch, "location"> & OwnProps> = connect(mapStateToProps, mapDispatchToProps)(TopMenuComponent)
