import { Action } from './actions'
import { appInitialState, AppState, Message, User } from '../models'


export function changeUserName(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'USER_CHANGE_NAME') {

        // updating user names in messages
        state.messages
            .filter((message: Message) => message.user.clientId === action.user.clientId)
            .map((message: Message) => {
                message.user = { ...action.user }
            })

        return {...state, messages: state.messages.slice()}
    }

    return state
}
