import { Action } from './actions'
import { appInitialState, AppState, Message, User } from '../models'


export function changeUserName(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'USER_CHANGE_NAME') {

        let user: User = {...state.user}

        // checking current user to update
        if (user.clientId === action.user.clientId) {

            // updating user
            user.name = action.user.name
        }


        // updating user names in messages
        state.messages
            .filter((message: Message) => message.user.clientId === action.user.clientId)
            .map((message: Message) => {
                message.user = { ...action.user }
            })

        return {...state, user, messages: state.messages.slice()}
    }

    return state
}
