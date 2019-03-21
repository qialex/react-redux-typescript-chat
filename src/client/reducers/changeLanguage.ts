import { Action } from '../actions'
import { ChatState } from '../state'
import {SettingsDefault, User} from "../models"
import L from "../localization/localizedStrings";

const initialState: ChatState = {
    messages: [],
    users: [],
    user: undefined,
    settings: new SettingsDefault().fromLocalStorage()
}

export function changeLanguage(state: ChatState = initialState, action: Action): ChatState {
    if (action.type === 'LANGUAGE_CHANGE') {

        const language: string = action.language

        // setting language
        L.setLanguage(language)

        // saving selected language to the local storage
        localStorage.setItem('language', language)

        // updating state
        return {...state, settings: {...state.settings, language: language}}
    }

    return state
}
