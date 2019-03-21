import { reduceReducers } from "../utils"
import { addMessage, changeUserName, initData, otherUserJoined } from "./"

export const appReducers = reduceReducers(
    addMessage,
    changeUserName,
    initData,
    otherUserJoined,
)
