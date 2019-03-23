import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'
import { match, NavLink } from "react-router-dom"

import { Action, markAllMessagesReadAction } from '../../../../reducers/actions'
import { AppState, Message } from '../../../../models'
import { L } from '../../../../utils'

import './topMenu.scss'
import * as H from 'history'


const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    messages: state.messages
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
    markAllMessagesRead: () => {
        dispatch(markAllMessagesReadAction())
    }
})

interface OwnProps {
    location: H.Location,
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

    isActiveEvent(match: match): boolean {

        return match && match.isExact
    }

    render() {
        const unreadMessagesCount: number = this.getUnreadMessagesCount()

        return (
            <div className="top-menu">
                <NavLink
                    to="/"
                    className="menu-link"
                    activeClassName="is-active"
                    isActive={this.isActiveEvent}>

                    <span className="link-text">
                        {L.chat}
                    </span>

                    { unreadMessagesCount ?
                        <sup className="unread-message-count">
                            {unreadMessagesCount}
                        </sup> : '' }

                </NavLink>
                <NavLink
                    to="/settings"
                    className="menu-link"
                    activeClassName="is-active"
                    isActive={this.isActiveEvent}>

                    <span className="link-text">
                        {L.settings}
                    </span>
                </NavLink>
            </div>
        )
    }
}
export const TopMenu: React.ComponentClass<Pick<OwnProps & ConnectedState & ConnectedDispatch, "location"> & OwnProps> = connect(mapStateToProps, mapDispatchToProps)(TopMenuComponent)
