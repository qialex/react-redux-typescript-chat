import { DateType, Theme } from '../../models'

export type Action = {
    type: 'LANGUAGE_CHANGE',
    language: string
} | {
    type: 'THEME_CHANGE',
    theme: Theme
} | {
    type: 'DATE_TYPE_CHANGE',
    dateType: DateType
} | {
    type: 'CTRL_ENTER_CHANGE',
    ctrlEnter: boolean
}


export const changeLanguageAction = (language: string): Action => ({
    type: 'LANGUAGE_CHANGE',
    language
})

export const changeThemeAction = (theme: Theme): Action => ({
    type: 'THEME_CHANGE',
    theme
})

export const changeDateTypeAction = (dateType: DateType): Action => ({
    type: 'DATE_TYPE_CHANGE',
    dateType
})

export const changeCtrlEnterAction = (ctrlEnter: boolean): Action => ({
    type: 'CTRL_ENTER_CHANGE',
    ctrlEnter
})
