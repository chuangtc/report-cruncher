import {ThemeProvider as MuiThemeProvider} from '@mui/material'
import React from 'react'
import {MemoizedAppGlobalStyles} from "../styles/appStyles";
import {useAppSelector} from "../store/store";
import {darkTheme, lightTheme} from "./theme";

type ThemeProviderProps = {
    children: React.ReactNode
}
export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const darkMode = useAppSelector((state) => state.user.darkMode)
    const themeToUse = darkMode ? darkTheme : lightTheme

    return (
        <MuiThemeProvider theme={themeToUse}>
            <MemoizedAppGlobalStyles darkMode={darkMode}/>

            {children}
        </MuiThemeProvider>
    )
}
