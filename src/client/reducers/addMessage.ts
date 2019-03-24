import { Action } from './actions'
import { appInitialState, AppState, Message } from '../models'

export function addMessage(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'ADD_MESSAGE') {
        console.log (state, action)
        const message: Message = action.message

        message.isFromMe = message.user.id === state.client.user.id
        message.isRead = window.location.hash === '#/' || message.isFromMe

        return { ...state, messages: [ ...state.messages, action.message ] }
    }

    return state
}
