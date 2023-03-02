import {styled} from '@mui/material'
import {Route, Routes} from 'react-router-dom'
import {Notifications} from './components/Notifications/Notifications.component'
import classNames from 'classnames'
import React from 'react'
import {PageLayoutComponent} from "./components/pageLayout/pageLayout.component";

import {UserSettingsPage} from "./pages/UserSettings/UserSettings.component";
import {HomePage} from "./pages/Home/home.component";
import {ChatPage} from "./pages/Chat/chat.component";

const AppContainer = styled('div')`
  color: ${(props) => (props.theme.palette.mode === 'light' ? '#000' : '#fff')};
  display: flex;
  justify-content: center;
  align-items: center;
`
const AppBackgroundContainer = styled('div')`
  position: fixed;
  background: ${(props) => (props.theme.palette.mode === 'light' ? '#F6F6F9' : '#ffff')};
  z-index: -1;
  inset: 0;
  overflow: hidden;
`
export const AppCruncher = () => {
    return (
        <>
            <Notifications/>
            <AppBackgroundContainer />
            <AppContainer
                className={classNames({
                    app: true,
                })}
            >
                <Routes>
                    <Route path="/" element={<PageLayoutComponent/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="user" element={<UserSettingsPage/>}/>
                        <Route path="chat/:id" element={<ChatPage/>}/>
                        <Route path="*" element={<HomePage/>}/>
                    </Route>
                </Routes>
            </AppContainer>
        </>
    )
}
