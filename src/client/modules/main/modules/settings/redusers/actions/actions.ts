export type Action = {
    type: 'LANGUAGE_CHANGE',
    language: string
} | {
    type: 'THEME_CHANGE',
    theme: string
}

export const changeLanguageAction = (language: string): Action => ({
    type: 'LANGUAGE_CHANGE',
    language
})

export const changeThemeAction = (theme: string): Action => ({
    type: 'THEME_CHANGE',
    theme
})
