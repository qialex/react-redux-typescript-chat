import { Action } from "./actions"
import { SettingsState, settingsInitialState } from "../models"
import { L } from "../../../../../utils"


export function changeLanguage(state: SettingsState = settingsInitialState, action: Action): SettingsState {
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
