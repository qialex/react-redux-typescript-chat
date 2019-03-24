import { Action } from './actions'
import { appInitialState, AppState, Message } from '../models'

export function addMessage(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'ADD_MESSAGE') {

        const message: Message = action.message

        message.isFromMe = message.user.clientId === state.user.clientId
        message.isRead = window.location.hash === '#/' || message.isFromMe

        return {
            messages: [ ...state.messages, action.message ],
            user: state.user,
            settings: state.settings
        }
    }

    return state
}
