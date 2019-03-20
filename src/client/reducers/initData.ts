import { Action } from '../actions'
import { ChatState } from '../state'

const initialState: ChatState = {
    messages: [],
    users: [],
    user: undefined,
}

export function initData(state: ChatState = initialState, action: Action): ChatState {

    if (action.type === 'INIT_DATA') {
        return {
            messages: [],
            users: [ ...action.users ],
            user: action.user,
        }
    }

    return state
}
