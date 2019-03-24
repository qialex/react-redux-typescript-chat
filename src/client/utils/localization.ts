import LocalizedStrings from 'react-localization'


const localizedStrings = new LocalizedStrings({
    en:{
        thisLanguage: 'english',
        chat: 'chat',
        settings: 'settings',
        language: 'language',
        resetSettings: 'reset to defaults',
        resetSettingsConfirm: 'are you sure?',
        writeAMessage: 'Write a message...',
        send: 'send',
        enterAUserName: 'enter a user name...',
        userName: 'user name',
        interfaceColor: 'interface color',
        light: 'light',
        dark: 'dark',
        clockDisplay: 'clock display',
        h12: '12 hours',
        h24: '24 hours',
        sendMessageOn: 'send message on',
        on: 'on',
        off: 'off',
        sorryOccupiedUserName: 'Sorry, occupied',
        userNameCantBeEmpty: 'can\'t be empty',
    },
    ru: {
        thisLanguage: 'русский',
        chat: 'чат',
        settings: 'настройки',
        language: 'язык',
        resetSettings: 'сбросить настройки',
        resetSettingsConfirm: 'вы уверены?',
        writeAMessage: 'Напишите сообщение...',
        send: 'отправить',
        enterAUserName: 'введите имя пользователя...',
        userName: 'имя пользователя',
        interfaceColor: 'цвет интерфейса',
        light: 'светлый',
        dark: 'темный',
        clockDisplay: 'формат часов',
        h12: '12 часов',
        h24: '24 часа',
        sendMessageOn: 'отправлять сообщения на',
        on: 'вкл',
        off: 'выкл',
        sorryOccupiedUserName: 'извините, занято',
        userNameCantBeEmpty: 'не может быть пустым',
    }
})
export const L = localizedStrings
