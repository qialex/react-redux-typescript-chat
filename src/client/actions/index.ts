import {Message as MessageModel, User} from '../models';

export type Action = {
    type: 'INIT_DATA',
    user: User,
    users: User[],
} | {
    type: 'OTHER_USER_JOINED',
    user: User,
} | {
    type: 'USER_CHANGE_NAME',
    user: User,
} | {
    type: 'ADD_MESSAGE',
    message: MessageModel
}


export const initDataAction = (user: User, users: User[]): Action => ({
    type: 'INIT_DATA',
    user,
    users,
});

export const otherUserJoinedAction = (user: User): Action => ({
    type: 'OTHER_USER_JOINED',
    user,
});

export const changeUserNameAction = (user: User): Action => ({
    type: 'USER_CHANGE_NAME',
    user,
});

export const addMessageAction = (message: MessageModel): Action => ({
    type: 'ADD_MESSAGE',
    message
});


