import { Action } from '../actions'
import { ChatState } from '../state'

const initialState: ChatState = {
    messages: [],
    users: [],
    user: undefined,
}

export function otherUserJoined(state: ChatState = initialState, action: Action): ChatState {

    if (action.type === 'OTHER_USER_JOINED') {
        return {
            messages: [],
            users: [ ...state.users, action.user ],
            user: state.user,
        }
    }

    return state
}
