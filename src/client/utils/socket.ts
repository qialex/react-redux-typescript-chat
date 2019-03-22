import * as io from "socket.io-client"

import { store } from "../store"
import { addMessageAction, changeUserNameAction, initDataAction, otherUserJoinedAction } from "../reducers/actions"
import { Message, User } from "../models"


// creating socket
export const socket: SocketIOClient.Socket = io('http://localhost:3000')


// Listen for events from the server
socket.on('connect', function (data: any) {

    socket.on('initData', function({ user = {} as User, otherUsers = [] as User[], messages = [] as Message[]} = {}) {

        // init data contains current user, other users and few last messages
        store.dispatch(initDataAction(user, otherUsers, messages))
    })

    socket.on('otherUserJoined', function(user: User) {

        // Whenever the server broadcasts that some other user joined, add this user
        store.dispatch(otherUserJoinedAction(user))
    })

    socket.on('userChangedName', function(user: User) {

        // Whenever the server broadcasts that some user changed name, change local user
        store.dispatch(changeUserNameAction(user))
    })

    socket.on('message', function (message: Message) {

        // Whenever the server broadcasts a message, add it to our message list
        store.dispatch(addMessageAction(message))
    })
})
