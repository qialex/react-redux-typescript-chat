import { Action } from '../actions'
import { ChatState } from '../state'
import {SettingsDefault} from "../models";

const initialState: ChatState = {
    messages: [],
    users: [],
    user: undefined,
    settings: new SettingsDefault().fromLocalStorage()
}

export function addMessage(state: ChatState = initialState, action: Action): ChatState {
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
