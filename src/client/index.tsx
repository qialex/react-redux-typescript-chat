import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, compose, Reducer } from 'redux'
import { Provider } from 'react-redux'
import {
    Action,
    initDataAction,
    otherUserJoinedAction,
    changeUserNameAction,
    addMessageAction,
} from './actions'
import { initData } from "./reducers/initData"
import { otherUserJoined } from "./reducers/otherUserJoined"
import { addMessage } from './reducers/addMessage'
import { changeUserName } from './reducers/changeUserName'
import { changeLanguage } from "./reducers/changeLanguage"
import { changeTheme } from "./reducers/changeTheme";
import { App } from './components/app/App'

import { Message, User } from './models'
import { ChatState } from './state'

import * as io from 'socket.io-client'

import './index.scss'



const socket: SocketIOClient.Socket = io('http://localhost:3000')


// combine reducers
function combineReducers(...reducers: Reducer<ChatState>[]) {
    return (state: ChatState, action: Action) => {
        return reducers.reduce((previous: ChatState, next: Reducer<ChatState>) => next(previous, action), state)
    }
}

let store = createStore(combineReducers(initData, otherUserJoined, addMessage, changeUserName, changeLanguage, changeTheme), undefined, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())

// Listen for events from the server
socket.on('connect', function (data: any) {

    socket.on('initData', function({ user = {} as User, otherUsers = [] as User[]} = {}) {
        store.dispatch(initDataAction(user, otherUsers));
    })

    socket.on('otherUserJoined', function(user: User) {
        store.dispatch(otherUserJoinedAction(user));
    })

    socket.on('userChangedName', function(user: User) {
        store.dispatch(changeUserNameAction(user));
    })

    socket.on('message', function (message: Message) {
        // Whenever the server broadcasts a message, add it to our message list
        store.dispatch(addMessageAction(message));
    })
})

// Render the app
ReactDOM.render(
    <Provider store={store}>
        <App socket={socket} />
    </Provider>,
    document.getElementById("app")
)
