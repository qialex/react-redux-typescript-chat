import { reduceReducers } from "../../../../../utils"
import { changeLanguage, changeTheme } from "./"

export const settingsReducers = reduceReducers(
    changeLanguage,
    changeTheme,
)
