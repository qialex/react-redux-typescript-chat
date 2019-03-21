import { Action } from '../actions'
import { ChatState } from '../state'
import {SettingsDefault} from "../models";

const initialState: ChatState = {
    messages: [],
    users: [],
    user: undefined,
    settings: new SettingsDefault().fromLocalStorage()
}

export function initData(state: ChatState = initialState, action: Action): ChatState {

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
