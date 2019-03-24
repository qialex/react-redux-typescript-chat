import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Action, resetSettingsAction } from '../../redusers/actions'

import { L } from "../../../../../../utils"

import './resetButton.scss'

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
    resetSettings: () => {
        dispatch(resetSettingsAction())
    }
})

interface OwnProps {
    language: string
}

interface ConnectedDispatch {
    resetSettings: () => void
}

interface OwnState {
    pressedTimeout: number
}

export class ResetButtonComponent extends React.Component<ConnectedDispatch & OwnProps, OwnState> {

    state: OwnState = {
        pressedTimeout: undefined
    }

    componentWillUnmount(): void {

        if (this.state.pressedTimeout) {

            // clearing timeout
            clearTimeout(this.state.pressedTimeout)
        }
    }

    handleResetButtonClicked = (event: any) => {

        event.preventDefault()

        if (this.state.pressedTimeout) {

            // resetting settings
            this.props.resetSettings()

            // clearing timeout
            clearTimeout(this.state.pressedTimeout)

            // clearing state
            this.setState({pressedTimeout: undefined})

        } else {

            const pressedTimeout: number = window.setTimeout(() => {

                // if user will not confirm in a 5 seconds - button will return in it's initial state
                this.setState({pressedTimeout: undefined})
            }, 5000)

            this.setState({pressedTimeout})
        }

    }

    render() {

        const pressedTimeout = this.state.pressedTimeout

        return (
            <div className="reset-button-wrapper">
                <div className="reset-button" onClick={this.handleResetButtonClicked}>
                    {pressedTimeout ? L.resetSettingsConfirm : L.resetSettings}
                </div>
            </div>
        )
    }
}

export const ResetButton: React.ComponentClass<OwnProps> = connect(null, mapDispatchToProps)(ResetButtonComponent)
