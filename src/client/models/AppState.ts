import { Message, User } from './'
import { Settings, SettingsDefault } from '../modules/main/modules/settings/models'

export interface AppState {
    messages: Message[]
    user: User
    settings: Settings
}


export const appInitialState: AppState = {
    messages: [],
    user: undefined,
    settings: new SettingsDefault().getFromLocalStorage()
}
