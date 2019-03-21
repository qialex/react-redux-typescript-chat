import LocalizedStrings from 'react-localization'


const localizedStrings = new LocalizedStrings({
    en:{
        thisLanguage: 'english',
        settings: 'settings',
        language: 'language',
    },
    ru: {
        thisLanguage: 'русский',
        settings: 'настройки',
        language: 'язык',

    }
})
export const L = localizedStrings
