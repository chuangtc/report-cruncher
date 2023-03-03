import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getFromLocalStorage, setInLocalStorage} from '../utils/localStorageUtils'

import {UserInState} from './user.types'

export enum UserSettingTabs {
    'tab1User' = 'tab1User',
}

export interface UserState {
    user: UserInState | undefined
    darkMode: boolean
    sidebarOpen: boolean
    language: string
}

const initialSidebarOpen = getFromLocalStorage('sidebarOpen') ?? true
const initialDarkMode = getFromLocalStorage('darkMode') ?? false
const setSidebarOpenCSSVariable = (newOpen: boolean) => {
    document.documentElement.style.setProperty('--sidebarWidth', newOpen ? '277px' : '103px')
}
setSidebarOpenCSSVariable(initialSidebarOpen)

const initialState: UserState = {
    user: undefined,
    darkMode: initialDarkMode,
    sidebarOpen: initialSidebarOpen,
    language: 'de',
}

export type SetDarkModeAction = PayloadAction<boolean>
export type SetSidebarOpenAction = PayloadAction<boolean>

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInState>) => {
            const user: UserInState = {
                ...action.payload,
            }
            state.user = user
        },
        getUser: (state) => {

        },
        setDarkMode: (state, action: SetDarkModeAction) => {
            setInLocalStorage('darkmode', action.payload)
            state.darkMode = action.payload
        },
        setSidebarOpen: (state, action: SetSidebarOpenAction) => {
            setSidebarOpenCSSVariable(action.payload)
            setInLocalStorage('sidebarOpen', action.payload)
        },
    },
})


export default userSlice.reducer
