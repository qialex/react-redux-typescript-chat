import { Action } from './actions'
import { appInitialState, AppState } from '../models'


export function initData(state: AppState = appInitialState, action: Action): AppState {

    if (action.type === 'INIT_DATA') {

        return {
            messages: [],
            users: [ ...action.users ],
            user: action.user,
            settings: state.settings,
        }
    }

    return state
}
