import { Action } from '../actions'
import { ChatState } from '../state'
import {SettingsDefault} from "../models";

const initialState: ChatState = {
    messages: [],
    users: [],
    user: undefined,
    settings: new SettingsDefault().fromLocalStorage()
}

export function otherUserJoined(state: ChatState = initialState, action: Action): ChatState {

    if (action.type === 'OTHER_USER_JOINED') {
        return {
            messages: [],
            users: [ ...state.users, action.user ],
            user: state.user,
            settings: state.settings,
        }
    }

    return state
}
