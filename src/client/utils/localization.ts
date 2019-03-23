import LocalizedStrings from 'react-localization'


const localizedStrings = new LocalizedStrings({
    en:{
        thisLanguage: 'english',
        chat: 'chat',
        settings: 'settings',
        language: 'language',
        resetSettings: 'reset to defaults',
        resetSettingsConfirm: 'are you sure?',
    },
    ru: {
        thisLanguage: 'русский',
        chat: 'чат',
        settings: 'настройки',
        language: 'язык',
        resetSettings: 'сбросить настройки',
        resetSettingsConfirm: 'вы уверены?',
    }
})
export const L = localizedStrings
