import { Action } from '../actions'
import { ChatState } from '../state'
import { SettingsDefault } from "../models"


const initialState: ChatState = {
    messages: [],
    users: [],
    user: undefined,
    settings: new SettingsDefault().fromLocalStorage()
}

export function changeTheme(state: ChatState = initialState, action: Action): ChatState {
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
