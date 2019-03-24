import { Client, Message } from './'
import { Settings, SettingsDefault } from '../modules/main/modules/settings/models'

export interface AppState {
    client: Client
    messages: Message[]
    settings: Settings
}

export const appInitialState: AppState = {
    client: undefined,
    messages: [],
    settings: new SettingsDefault().getFromLocalStorage()
}
