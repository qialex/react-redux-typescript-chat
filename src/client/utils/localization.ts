import LocalizedStrings from 'react-localization'


const localizedStrings = new LocalizedStrings({
    en:{
        thisLanguage: 'english',
        settings: 'settings',
        language: 'language',
        resetSettings: 'reset settings',
        resetSettingsConfirm: 'are you sure?',
    },
    ru: {
        thisLanguage: 'русский',
        settings: 'настройки',
        language: 'язык',
        resetSettings: 'сбросить настройки',
        resetSettingsConfirm: 'вы уверены?',
    }
})
export const L = localizedStrings
