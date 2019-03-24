import * as io from "socket.io-client"

import { store } from "../store"
import { addMessageAction, changeUserNameAction, initDataAction, otherUserJoinedAction } from "../reducers/actions"
import { Message, User } from "../models"


export class SocketService {

    private _initialized: boolean

    public socket: SocketIOClient.Socket

    constructor() {

        // creating socket
        this.socket = io('http://localhost:3000')

        this._init()
    }

    _init(): void {

        const socket: SocketIOClient.Socket = this.socket

        // Listen for events from the server
        socket.on('connect', () => {

            if (this._initialized) {
                return
            }

            this._initialized = true

            socket.on('initData', function({ user = {} as User, messages = [] as Message[]} = {}) {

                // init data contains current user, other users and few last messages
                store.dispatch(initDataAction(user, messages))
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
    }
}

// creating socketService
export const socketService: SocketService = new SocketService()
