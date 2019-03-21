import { Action } from "./actions"
import { SettingsState, settingsInitialState } from "../models"


export function changeTheme(state: SettingsState = settingsInitialState, action: Action): SettingsState {
    if (action.type === 'THEME_CHANGE') {

        const theme: string = action.theme

        // setting theme
        document.body.className = `theme-${theme}`

        // saving selected theme to the local storage
        localStorage.setItem('theme', theme)

        // updating state
        return {...state, settings: {...state.settings, theme: theme}}
    }

    return state
}
