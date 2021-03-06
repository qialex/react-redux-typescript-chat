import { Action } from './actions'
import { appInitialState, AppState } from '../models'


export function otherUserJoined(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'OTHER_USER_JOINED') {

        return {
            messages: state.messages,
            user: state.user,
            settings: state.settings,
        }
    }

    return state
}
