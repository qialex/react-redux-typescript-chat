import { reduceReducers } from "../../../../../utils"
import { changeCtrlEnter, changeDateType, changeLanguage, changeTheme, resetSettings } from "./"

export const settingsReducers = reduceReducers(
    changeCtrlEnter,
    changeDateType,
    changeLanguage,
    changeTheme,
    resetSettings,
)
