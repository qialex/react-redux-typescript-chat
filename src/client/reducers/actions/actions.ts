import {Message, User} from '../../models';


export type Action = {
    type: 'INIT_DATA',
    user: User,
    messages: Message[],
} | {
    type: 'OTHER_USER_JOINED',
    user: User,
} | {
    type: 'USER_CHANGE_NAME',
    user: User,
} | {
    type: 'ADD_MESSAGE',
    message: Message
} | {
    type: 'MARK_ALL_MESSAGES_READ',
}


export const initDataAction = (user: User, messages: Message[]): Action => ({
    type: 'INIT_DATA',
    user,
    messages,
})

export const otherUserJoinedAction = (user: User): Action => ({
    type: 'OTHER_USER_JOINED',
    user,
})

export const changeUserNameAction = (user: User): Action => ({
    type: 'USER_CHANGE_NAME',
    user,
})

export const addMessageAction = (message: Message): Action => ({
    type: 'ADD_MESSAGE',
    message
})

export const markAllMessagesReadAction = (): Action => ({
    type: 'MARK_ALL_MESSAGES_READ',
})
