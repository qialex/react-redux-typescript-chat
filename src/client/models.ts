export interface User {
    clientId: string
    name: string
}

export interface Message {
    clientId: string
    timestamp: number
    message: string
}

export interface MessageView extends Message {
    isFromMe: boolean
    username: string
}
