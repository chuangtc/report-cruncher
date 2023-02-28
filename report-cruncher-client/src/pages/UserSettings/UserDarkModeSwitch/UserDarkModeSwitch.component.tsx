import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {userSlice} from "../../../store/user.slice";

export const UserDarkModeSwitch = () => {
    const darkMode = useAppSelector((state) => state.user.darkMode)

    const sliceToUse = userSlice
    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(sliceToUse.actions.setDarkMode(event.target.checked))
    }

    return (
        <>
            <FormControlLabel
                control={<Switch checked={darkMode} onChange={handleChange}/>}
                label={darkMode ? 'Dark' : 'Light'}
            />
        </>
    )
}
