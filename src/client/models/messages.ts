export interface Message {
    clientId: string
    timestamp: number
    message: string
    isRead?: boolean
}

export interface MessageView extends Message {
    isFromMe: boolean
    username: string
}
