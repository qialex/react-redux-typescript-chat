import { Message, User } from './'
import { Settings, SettingsDefault } from '../modules/main/modules/settings/models'

export interface AppState {
    messages: Message[]
    users: User[]
    user: User
    settings: Settings
}


export const appInitialState: AppState = {
    messages: [],
    users: [],
    user: undefined,
    settings: new SettingsDefault().fromLocalStorage()
}
