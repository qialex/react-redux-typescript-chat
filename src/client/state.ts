import {Message as MessageModel, Settings, User} from './models'

export interface ChatState {
    messages: MessageModel[]
    users: User[]
    user: User
    settings: Settings
}
