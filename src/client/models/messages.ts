import { User } from './user'

export interface Message {
    user: User
    timestamp: number
    message: string
    isRead?: boolean
    isFromMe?: boolean
}
