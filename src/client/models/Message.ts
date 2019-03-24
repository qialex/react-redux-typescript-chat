import { User } from './User'

export interface Message {
    user: User
    timestamp: number
    message: string
    isRead?: boolean
    isFromMe?: boolean
}
