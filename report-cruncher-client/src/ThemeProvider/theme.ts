import {createTheme, ThemeOptions} from '@mui/material'


export interface CustomThemeParts {
    colors?: {
        gradients?: {
            grey?: string
            light?: string
            main?: string
            dark?: string
        }
        backgrounds?: {
            grey?: string
            light?: string
            main?: string
            dark?: string
        }
        primaryPetrol?: string
        borderTableBottom?: string
    }
}

export interface CustomTheme extends CustomThemeParts, ThemeOptions {
}

const sharedSettings: CustomTheme = {
    palette: {
        primary: {
            100: '#test',
            200: '#test',
            300: '#test',
            400: '#test',
            500: '#test',
            600: '#test',
            700: '#test',
            800: '#test',
            900: '#test',
            main: '#53AEDA',
        },
        secondary: {
            100: '#test',
            200: '#test',
            300: '#test',
            400: '#test',
            500: '#test',
            600: '#test',
            700: '#test',
            800: '#test',
            900: '#test',
            main: '#test',
        },
        error: {
            50: '#test',
            100: '#test',
            200: '#test',
            300: '#test',
            400: '#test',
            500: '#test',
            600: '#test',
            700: '#test',
            800: '#test',
            900: '#test',
            A100: '#test',
            A200: '#test',
            A400: '#test',
            A700: '#test',
        },
        success: {
            100: '#test',
            200: '#test',
            300: '#test',
            400: '#test',
            500: '#test',
            600: '#test',
            700: '#test',
            800: '#test',
            900: '#test',
            main: '#test',
        },
        grey: {
            100: '#test',
            200: '#test',
            300: '#test',
            400: '#test',
            500: '#test',
            600: '#test',
            700: '#test',
            800: '#test',
            900: '#test',
        },
    },
    colors: {
        primaryPetrol: 'rgba(2, 175, 238, 1)',
        backgrounds: {
            light: '#test',
            main: '#test',
            dark: '#test',
            grey: '#test',
        },
    },
}

export const lightTheme = createTheme({
    ...sharedSettings,
    palette: {
        mode: 'light',
        ...sharedSettings.palette,
    },
    components: {},
})

export const darkTheme = createTheme({
    ...sharedSettings,
    palette: {
        mode: 'dark',
        ...sharedSettings.palette,
    },
    components: {},


})
