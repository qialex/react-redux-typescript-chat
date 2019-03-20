import { Action } from '../actions'
import { ChatState } from '../state'
import { User } from "../models"

const initialState: ChatState = {
    messages: [],
    users: [],
    user: undefined,
}

export function changeUserName(state: ChatState = initialState, action: Action): ChatState {
    if (action.type === 'USER_CHANGE_NAME') {

        const userToUpdate = [...state.users, state.user]
            .find((user: User) => user.clientId === action.user.clientId)

        userToUpdate.name = action.user.name

        return {...state, messages: state.messages.slice()}
    }

    return state
}
