import { Action } from './actions'
import { appInitialState, AppState, User } from '../models'


export function changeUserName(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'USER_CHANGE_NAME') {

        const userToUpdate = [...state.users, state.user]
            .find((user: User) => user.clientId === action.user.clientId)

        userToUpdate.name = action.user.name

        return {...state, messages: state.messages.slice()}
    }

    return state
}
