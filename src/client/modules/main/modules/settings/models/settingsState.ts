import { Settings, SettingsDefault } from "./"


export interface SettingsState {
    settings: Settings
}

export const settingsInitialState: SettingsState = {
    settings: new SettingsDefault().getFromLocalStorage()
}
