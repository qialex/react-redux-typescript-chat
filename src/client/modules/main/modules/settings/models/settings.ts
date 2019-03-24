import { L } from "../../../../../utils"

export interface Settings {
    theme: Theme
    dateType: DateType
    language: string
    ctrlEnter: boolean
}

export enum Theme {
    light = 'light',
    dark = 'dark'
}

export enum DateType {
    h12 = 'h12',
    h24 = 'h24'
}

export class SettingsDefault implements Settings {

    theme: Theme
    dateType: DateType
    language: string
    ctrlEnter: boolean

    constructor(data?: Settings) {

        if (!data) {

            data = this.getDefaults()
        }

        this.theme          = data.theme
        this.dateType       = data.dateType
        this.language       = data.language
        this.ctrlEnter      = data.ctrlEnter

    }

    public getDefaults(): Settings {

        return {
            theme: Theme.light,
            dateType: DateType.h12,
            language: L.getAvailableLanguages()[0],
            ctrlEnter: true,
        }
    }

    public getFromLocalStorage(): Settings {
        return {
            theme: localStorage.getItem('theme') as Theme || this.theme,
            dateType: localStorage.getItem('dateType') as DateType || this.dateType,
            language: localStorage.getItem('language') || this.language,
            ctrlEnter: localStorage.getItem('ctrlEnter') === true.toString() || this.ctrlEnter,
        }
    }
}
