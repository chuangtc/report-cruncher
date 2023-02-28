import React, {useState} from 'react'
import {Box, styled, Tab, Typography} from '@mui/material'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import {UserGeneralSettingsTab} from './Tab1User/UserSettings.userTab.component'
import {useAppSelector} from "../../store/store";
import {UserSettingTabs} from "../../store/user.slice";

const StyledContainer = styled('div')`
  .left-section {
    z-index: 1;
    flex-shrink: 0;
    width: 278px;
    padding-right: 32px;
    padding-top: 32px;
    margin-left: -64px;
    padding-left: 64px;
    box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
  }

  .right-section {
    flex: 1;
  }
`

interface UserSettingPage {
    tab: UserSettingTabs
}

const HeaderStyled = styled(Typography)`

  font-size: 24px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.4px;
  color: ${(props) => (props.theme.palette.mode === 'light' ? '#0000' : '#fff')};`

export const UserSettingsPage = () => {
    const user = useAppSelector((state) => state.user.user)

    const [tab, setTab] = useState<UserSettingPage>({
        tab: UserSettingTabs.tab1User,
    })

    const changeTab = (newTab: string) => {
        setTab({tab: newTab as UserSettingTabs})
    }

    return (
        <>
            <div>
                <>
                    <HeaderStyled>Settings</HeaderStyled>
                </>
            </div>
            <div>
                <StyledContainer style={{width: '100%', padding: '48px 32px 80px 64px'}}>
                    <TabContext value={tab.tab}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={(_: any, value: any) => changeTab(value)}>
                                <Tab
                                    aria-controls={'testing'}
                                    label={"User"}
                                    value={UserSettingTabs.tab1User}
                                />

                            </TabList>
                        </Box>
                        <TabPanel
                            value={UserSettingTabs.tab1User}
                        >
                            <UserGeneralSettingsTab/>
                        </TabPanel>
                    </TabContext>
                </StyledContainer>

            </div>
        </>
    )
}
