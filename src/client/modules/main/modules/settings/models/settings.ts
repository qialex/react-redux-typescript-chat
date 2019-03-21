import { L } from "../../../../../utils"

export interface Settings {
    theme: string
    clockDisplay: '12h' | '24h'
    language: string
    ctrlEnter: boolean
}

export class SettingsDefault implements Settings {
    theme: string
    clockDisplay: '12h' | '24h'
    language: string
    ctrlEnter: boolean

    constructor() {
        this.theme = 'light'
        this.clockDisplay = '24h'
        this.language = L.getAvailableLanguages()[0]
        this.ctrlEnter = false
    }

    public serialize(): Settings {

        // return Object.keys(this).reduce((result: object, key: string) => {
        //     return {...result, [key]: this[key]}
        // }, {} as Settings)
        return JSON.parse(JSON.stringify(this))
    }

    public fromLocalStorage(): Settings {
        return {
            theme: localStorage.getItem('theme') || this.theme,
            clockDisplay: localStorage.getItem('clockDisplay') as '12h' | '24h' || this.clockDisplay,
            language: localStorage.getItem('language') || this.language,
            ctrlEnter: !!localStorage.getItem('ctrlEnter') || this.ctrlEnter,
        }
    }
}
