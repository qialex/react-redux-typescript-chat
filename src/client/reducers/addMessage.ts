import { Action } from './actions'
import { appInitialState, AppState } from '../models'

export function addMessage(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'ADD_MESSAGE') {

        return {
            messages: [ ...state.messages, action.message ],
            users: state.users,
            user: state.user,
            settings: state.settings
        }
    }

    return state
}
