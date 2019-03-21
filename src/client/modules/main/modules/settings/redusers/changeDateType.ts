import { Action } from "./actions"
import { SettingsState, settingsInitialState, DateType } from "../models"


export function changeDateType(state: SettingsState = settingsInitialState, action: Action): SettingsState {

    if (action.type === 'DATE_TYPE_CHANGE') {

        const dateType: DateType = action.dateType

        // saving selected language to the local storage
        localStorage.setItem('dateType', dateType)

        // updating state
        return {...state, settings: {...state.settings, dateType: dateType}}
    }

    return state
}
