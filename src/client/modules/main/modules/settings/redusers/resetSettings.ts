import { Action } from "./actions"
import { SettingsState, settingsInitialState, SettingsDefault, Settings } from "../models"
import { L } from '../../../../../utils'


export function resetSettings(state: SettingsState = settingsInitialState, action: Action): SettingsState {

    if (action.type === 'RESET_SETTINGS') {

        const settings: Settings = new SettingsDefault().getDefaults()

        // setting language
        L.setLanguage(settings.language)

        // updating theme
        document.body.className = `theme-${settings.theme}`

        // clear localStorage
        Object.keys(settings).map((key: string) => {
            localStorage.removeItem(key)
        })

        // resetting settings to initial state
        return {...state, settings}
    }

    return state
}
