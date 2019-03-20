import { Action } from '../actions'
import { ChatState } from '../state'

const initialState: ChatState = {
    messages: [],
    users: [],
    user: undefined,
}

export function addMessage(state: ChatState = initialState, action: Action): ChatState {
    if (action.type === 'ADD_MESSAGE') {
        return {
            messages: [ ...state.messages, action.message ],
            users: state.users,
            user: state.user,
        }
    }

    return state
}
