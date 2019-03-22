import { Action } from './actions'
import { appInitialState, AppState, Message } from '../models'

export function addMessage(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'ADD_MESSAGE') {

        const message: Message = action.message

        message.isRead = window.location.hash === '#/' || message.clientId === state.user.clientId

        return {
            messages: [ ...state.messages, action.message ],
            users: state.users,
            user: state.user,
            settings: state.settings
        }
    }

    return state
}
