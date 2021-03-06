import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../../../../models'
import { Action, changeLanguageAction } from '../../redusers/actions'




import './languageSelect.scss'
import { L } from "../../../../../../utils"
import {ChangeEvent} from "react";


const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    language: state.settings.language
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
    changeLanguage: (language: string) => {
        dispatch(changeLanguageAction(language))
    }
})

interface OwnProps {
}

interface ConnectedState {
    language: string,
}

interface ConnectedDispatch {
    changeLanguage: (language: string) => void
}

interface OwnState {
}

export class LanguageSelectComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    handleLanguageChanged = (event: ChangeEvent<HTMLSelectElement>) => {

        // selected language abbreviation
        const language = event.target.value

        // setting language in global settings to re-render related components
        this.props.changeLanguage(language)
    }

    render() {

        const { language } = this.props

        const languages = L.getAvailableLanguages()

        // doing options for select
        const options = languages.map(lang => {
            return <option key={lang} value={lang}>{(L as any)._props[lang].thisLanguage}</option>;
        });

        return (
            <div className="setting-language">
                <select value={language} onChange={this.handleLanguageChanged}>
                    {options}
                </select>
            </div>
        )
    }
}

export const LanguageSelect: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(LanguageSelectComponent)
