import { Action } from './actions'
import { appInitialState, AppState, Message } from '../models'


export function markAllMessagesRead(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'MARK_ALL_MESSAGES_READ') {

        const messages = (state.messages || [])
            .filter((message: Message) => !message.isRead)
            .map((message: Message) => {

                message.isRead = true
                return message
            })

        return {...state, messages}
    }

    return state
}
