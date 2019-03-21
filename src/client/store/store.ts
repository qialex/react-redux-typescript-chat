import { createStore } from "redux"

import { reduceReducers } from "../utils"
import { appReducers } from "../reducers"
import { settingsReducers } from "../modules/main/modules/settings/redusers"


export const store = createStore(reduceReducers(appReducers, settingsReducers), undefined, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
console.log (store)
console.log (store.getState())
