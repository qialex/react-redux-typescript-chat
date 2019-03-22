import { reduceReducers } from "../utils"
import { addMessage, changeUserName, initData, markAllMessagesRead, otherUserJoined } from "./"


export const appReducers = reduceReducers(
    addMessage,
    changeUserName,
    initData,
    markAllMessagesRead,
    otherUserJoined,
)
