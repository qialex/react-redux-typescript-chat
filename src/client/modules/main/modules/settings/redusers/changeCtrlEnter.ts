import { Action } from "./actions"
import { SettingsState, settingsInitialState } from "../models"


export function changeCtrlEnter(state: SettingsState = settingsInitialState, action: Action): SettingsState {

    if (action.type === 'CTRL_ENTER_CHANGE') {

        const ctrlEnter: boolean = action.ctrlEnter

        // saving selected language to the local storage
        localStorage.setItem('ctrlEnter', ctrlEnter.toString())

        // updating state
        return {...state, settings: {...state.settings, ctrlEnter}}
    }

    return state
}
