import { Action } from './actions'
import { appInitialState, AppState, Message, User } from '../models'


export function changeUserName(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'USER_CHANGE_NAME') {

        // updating user names in messages
        state.messages
            .filter((message: Message) => message.user.id === action.user.id)
            .map((message: Message) => {
                message.user = { ...action.user }
            })

        // updating user name in client
        const client = state.client
        if (client.user.id === action.user.id) {
            client.user.name = action.user.name
        }

        return {...state, client: client, messages: state.messages.slice()}
    }

    return state
}
