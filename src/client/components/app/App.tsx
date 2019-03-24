import * as React from 'react'
import { Provider } from "react-redux"

import { store } from "../../store"
import { socketService } from "../../utils";

import { MainModule } from "../../modules/main"

import './app.scss'


export class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <MainModule socketService={socketService} />
            </Provider>
        )
    }
}
