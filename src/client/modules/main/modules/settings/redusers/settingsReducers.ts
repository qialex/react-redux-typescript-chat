import { reduceReducers } from "../../../../../utils"
import { changeCtrlEnter, changeDateType, changeLanguage, changeTheme } from "./"

export const settingsReducers = reduceReducers(
    changeCtrlEnter,
    changeDateType,
    changeLanguage,
    changeTheme,
)
