import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Action, changeCtrlEnterAction, changeDateTypeAction, changeThemeAction } from '../../redusers/actions'
import { AppState, User } from '../../../../../../models'
import { DateType, Settings as IeSettings, Theme } from "../../models"
import { LanguageSelect, RadioButton, ResetButton, UserNameInput } from "../";
import { L, SocketService } from "../../../../../../utils";
import { ChangeEvent } from 'react'

import './settings.scss'

const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    user: state.user,
    settings: state.settings,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
    changeTheme: (theme: Theme) => {
        dispatch(changeThemeAction(theme));
    },
    changeDateType: (dateType: DateType) => {
        dispatch(changeDateTypeAction(dateType));
    },
    changeCtrlEnter: (ctrlEnter: boolean) => {
        dispatch(changeCtrlEnterAction(ctrlEnter));
    }
});

interface OwnProps {
    socketService: SocketService
}

interface ConnectedState {
    user: User,
    settings: IeSettings,
}

interface ConnectedDispatch {
    changeTheme: (theme: Theme) => void
    changeDateType: (dateType: DateType) => void
    changeCtrlEnter: (ctrlEnter: boolean) => void
}

export class SettingsComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps> {

    componentDidUpdate(prevProps: ConnectedState) {

        // if prop.user.name is changed
        if (this.props.user && this.props.user.name && (!prevProps.user || prevProps.user.name !== this.props.user.name)) {

            this.setState({username: this.props.user.name})
        }
    }

    themeChangeHandler(event: ChangeEvent<HTMLInputElement>): void {

        // setting theme
        this.props.changeTheme(event.target.value as Theme)
    }

    dateTypeChangeHandler(event: ChangeEvent<HTMLInputElement>): void {

        // setting dateType
        this.props.changeDateType(event.target.value as DateType)
    }

    ctrlEnterChangeHandler(ctrlEnter: boolean): void {

        // setting ctrlEnter
        this.props.changeCtrlEnter(ctrlEnter)
    }

    render() {
        return (
            <div className="settings-wrapper">
                <div className="setting-item">
                    <UserNameInput socketService={this.props.socketService}/>
                </div>

                <div className="setting-item">
                    <div className="setting-title">{L.interfaceColor}:</div>
                    <div className="setting-values">
                        <RadioButton
                            name='skin'
                            checked={this.props.settings.theme === Theme.light}
                            value={Theme.light}
                            label={L.light}
                            onChange={this.themeChangeHandler.bind(this)}/>
                        <RadioButton
                            name='skin'
                            checked={this.props.settings.theme === Theme.dark}
                            value={Theme.dark}
                            label={L.dark}
                            onChange={this.themeChangeHandler.bind(this)}/>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-title">{L.clockDisplay}:</div>
                    <div className="setting-values">
                        <RadioButton
                            name='dateType'
                            checked={this.props.settings.dateType === DateType.h12}
                            value={DateType.h12}
                            label={L.h12}
                            onChange={this.dateTypeChangeHandler.bind(this)}/>
                        <RadioButton
                            name='dateType'
                            checked={this.props.settings.dateType === DateType.h24}
                            value={DateType.h24}
                            label={L.h24}
                            onChange={this.dateTypeChangeHandler.bind(this)}/>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-title">{L.sendMessageOn} CTRL+ENTER:</div>
                    <div className="setting-values">
                        <RadioButton
                            name='ctrlEnter'
                            checked={this.props.settings.ctrlEnter}
                            value={'true'}
                            label={L.on}
                            onChange={this.ctrlEnterChangeHandler.bind(this, true)}
                        />
                        <RadioButton
                            name='ctrlEnter'
                            checked={!this.props.settings.ctrlEnter}
                            value={'false'}
                            label={L.off}
                            onChange={this.ctrlEnterChangeHandler.bind(this, false)}
                        />
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-title">{L.language}</div>
                    <LanguageSelect />
                </div>

                <ResetButton language={this.props.settings.language} />

            </div>
        )
    }
}

export const Settings: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
