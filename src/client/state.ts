import { Message as MessageModel, User } from './models'

export interface ChatState {
    messages: MessageModel[]
    users: User[]
    user: User
}
