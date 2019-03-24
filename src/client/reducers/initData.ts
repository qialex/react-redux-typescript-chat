import { Action } from './actions'
import { appInitialState, AppState, Message } from '../models'


export function initData(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'INIT_DATA') {

        localStorage.setItem('token', action.client.token)

        const messages = action.messages.map((message: Message) => {

            // message.isFromMe = message.user.id === action.user.id
            // message.isRead = window.location.hash === '#/' || message.isFromMe

            return message
        })

        return {
            client: action.client,
            messages: messages,
            settings: state.settings,
        }
    }

    return state
}
