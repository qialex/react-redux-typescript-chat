import { Action } from './actions'
import { appInitialState, AppState, Message } from '../models'


export function initData(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'INIT_DATA') {

        const messages = action.messages.map((message: Message) => {

            message.isFromMe = message.user.clientId === action.user.clientId
            message.isRead = window.location.hash === '#/' || message.isFromMe

            return message
        })

        return {
            messages: messages,
            user: action.user,
            settings: state.settings,
        }
    }

    return state
}
