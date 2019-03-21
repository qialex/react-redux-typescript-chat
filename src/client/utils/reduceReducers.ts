import {Reducer} from "redux";
import {AppState} from "../models/AppState";
import {SettingsState} from "../modules/main/modules/settings/models";
import {Action} from "../reducers/actions";

export const reduceReducers = function (...reducers: Reducer<AppState | SettingsState>[]) {
    return (state: AppState | SettingsState, action: Action) => {
        return reducers.reduce((previous: AppState | SettingsState, next: Reducer<AppState | SettingsState>) => next(previous, action), state)
    }
}
