import {matchPath, useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {MenuItem} from "./pageLayout.types";
import {Button, Container, List, ListItemButton, ListItemIcon, ListItemText, styled, Theme} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiDrawer from '@mui/material/Drawer'
import AddIcon from "@mui/icons-material/Add";
import {getRouteEntry} from "./pageLayout.component";

const drawerWidth = 277
const drawerWidthClosed = 103
const subDrawerWidth = 275

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: drawerWidthClosed,
})

// @ts-ignore
const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '&&& .MuiDrawer-paper': {
        zIndex: 9999,
        background: theme.palette.mode === 'light' ? '#3B3F44' : '#3AA1AF',
        boxShadow:
            theme.palette.mode === 'light'
                ? '0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24, 39, 75, 0.1)'
                : '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 6px 12px -6px rgba(24, 39, 75, 0.12)',
        backdropFilter: 'blur(24px)',
        border: 0,
    },
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}))

// @ts-ignore
const SecondLevelDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'mainOpen'})(
    ({theme, open}) => ({
        width: 0,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '&&& .MuiDrawer-paper': {
            background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(28, 58, 73, 0.3)',
            backdropFilter: 'blur(15px)',
            border: 0,
            boxShadow:
                theme.palette.mode === 'light' ? '2px 2px 15px rgba(91, 91, 91, 0.1)' : '0px 4px 4px rgba(0, 0, 0, 0.25)',
            transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            overflow: 'hidden',
            width: subDrawerWidth,
        },
        ...(open && {
            '&&&& .MuiDrawer-paper': {
                transform: `translate(${drawerWidthClosed}px,0) !important`,
            },
            '&&&&.mainOpen .MuiDrawer-paper': {
                transform: `translate(${drawerWidth}px,0) !important`,
            },
        }),
        '&&& .MuiBackdrop-root': {
            backgroundColor: 'transparent',
        },
        '&&& .title': {
            paddingTop: 45,
            paddingBottom: 31,
            paddingLeft: 24,
            fontSize: 19,
            fontWeight: 800,
            lineHeight: '24px',
            letterSpacing: '0.15px',
            textTransform: 'uppercase',
        },
    }),
)

const SecondLevelListItem = styled(ListItemButton)`
  padding-left: 24px;
  min-height: 55px;
  opacity: 1;

  &.active {
    opacity: 1;
    background: ${(props) => (props.theme.palette.mode === 'light' ? '#fff' : '#003047')};
  }

  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
`

const SecondLevelListItemText = styled(ListItemText)``

const ContainerWrapperListItem = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &.first-child {
    border: 1px solid ${(props) => (props.theme.palette.mode === 'light' ? '#000' : '#000')};

`

const ListItem = styled(ListItemButton)`
  padding-left: 24px;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 4px;
  @media screen and (max-height: 800px) {
    padding-left: 30px;
  }
  color: ${(props) => (props.theme.palette.mode === 'light' ? '#000' : '#fff')};
  // add border to the first child
  &.active {
    color: ${(props) => (props.theme.palette.mode === 'light' ? '#fff' : '#000')};

    .MuiListItemIcon-root {
      background: ${(props) =>
              props.theme.palette.mode === 'light' ? '#3AA1AF' : '#000'};
      border-radius: 5px;
    }

    &.open {
      background: ${(props) => (props.theme.palette.mode === 'light' ? '#3AA1AF' : '#fff')};

      .MuiListItemIcon-root {
        background: transparent;
      }
    }
  }

  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  text-transform: uppercase;
`

export const MenuDrawerListItemIcon = styled(ListItemIcon)`
  min-width: 55px;
  min-height: 55px;
  @media screen and (max-height: 800px) {
    min-width: 45px;
    min-height: 45px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease margin-right;
  color: ${(props) => (props.theme.palette.mode === 'light' ? '#fff' : '#000')};

  &.closed {
    margin-right: 40px;
  }
`
export const MenuDrawerBottomListItem: any = styled(ListItem)`
  text-transform: none;
`
export const MenuDrawerListItemText: any = styled(ListItemText)`
  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 200px;
    }
  }
  @keyframes blinkTextCursor {
    from {
      border-right-color: hsl(0, 0%, 80%);
    }
    to {
      border-right-color: transparent;
    }
  }
  color: ${(props) => (props.theme.palette.mode === 'light' ? '#fff' : '#000')};
  margin-left: 5px;

  span {
    position: relative;
    width: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    animation: typewriter 1s steps(44) 1s 1 normal both,
    blinkTextCursor 500ms infinite;

  }
`

const MenuLogo = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 800;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: ${(props) => (props.theme.palette.mode === 'light' ? '#3AA1AF' : '#fff')};
  height: 150px;
  @media screen and (max-height: 800px) {
    height: 100px;
  }

  &&&.closed {
    .brand-shape-1 {
      opacity: 0;
      width: 0;
    }

    span {
      transform: translate(0);
    }
  }
`

const NewChatButton = styled(Button)`
  border: 1px solid #fff;
  display: flex;
  justify-content: start;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  span {
    color: #fff;
  }
  &.active {
    background: ${(props) => (props.theme.palette.mode === 'light' ? '#3AA1AF' : '#fff')};
    border: ${(props) => (props.theme.palette.mode === 'light' ? '1px solid #fff' : '1px solid #3AA1AF')};
    .MuiListItemIcon-root {
      color: ${(props) => (props.theme.palette.mode === 'light' ? '#fff' : '#3AA1AF')};
    }
    span {
        color: ${(props) => (props.theme.palette.mode === 'light' ? '#fff' : '#3AA1AF')};
    }
  }
`
const TopList = styled(List)`
  padding: 0;

`
const SecondLevelList = styled(List)`
  padding: 0;
`
const BottomList = styled(List)`
  margin-top: auto;
  padding: 0;
`

const CloseButton = styled(Button)`
  --items: 1;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 55px;
  height: 55px;
  min-height: 0 !important;
  @media screen and (max-height: 800px) {
    width: 45px;
    height: 45px;
  }
  transition: 0.3s ease all;

  &.closed {
    transform: translate(0, calc(-60px * var(--items))) rotate(180deg);
    @media screen and (max-height: 800px) {
      transform: translate(0, calc(-50px * var(--items))) rotate(180deg);
    }
    width: 103px;
  }

  &.items2 {
    --items: 2;
  }

  &.items3 {
    --items: 3;
  }

  &.items4 {
    --items: 4;
  }

  &.items5 {
    --items: 5;
  }
`

export const setSidebarOpenCSSVariable = (newOpen: boolean) => {
    document.documentElement.style.setProperty('--sidebarWidth', newOpen ? '277px' : '103px')
}

type MenuDrawerState = {
    clickedMenuItem: MenuItem | undefined
    open: boolean
}
export type MenuDrawerProps = {
    menuItems: MenuItem[]
    chatMenuItems: MenuItem[]
    bottomMenuItems: MenuItem[]
    projectTitle: string
    initialOpen?: boolean
    onChangeOpen?: (newOpen: boolean) => void
}
export const MenuDrawer = ({
                               menuItems,
                               chatMenuItems,
                               bottomMenuItems,
                               projectTitle,
                               initialOpen,
                               onChangeOpen,
                           }: MenuDrawerProps) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [state, setState] = useState<MenuDrawerState>(() => {
        const initialOpenToUse = initialOpen ?? true
        setSidebarOpenCSSVariable(initialOpenToUse)
        return {
            clickedMenuItem: undefined,
            open: initialOpenToUse,
        }
    })

    const openOrClosedClassName = state.open ? 'open' : 'closed'

    const menuItemIsActive = (menuItem: MenuItem) => {
        if (menuItem.key === state.clickedMenuItem?.key) {
            return true
        }
        if (!menuItem.activeOnRoutes || !menuItem.route) {
            return false
        }
        for (let activeOnRoute of menuItem.activeOnRoutes) {
            const match = matchPath(
                {
                    caseSensitive: false,
                    end: activeOnRoute.end,
                    path: activeOnRoute.route,
                },
                location.pathname,
            )
            if (match !== null) {
                return true
            }
        }

        return false
    }

    const renderSecondLevelContent = () => {
        if (!state.clickedMenuItem || !state.clickedMenuItem.children) {
            return null
        }

        return (
            <>
                <span className={'title'}>select</span>
                <SecondLevelList>
                    {state.clickedMenuItem.children.map((menuItem) => (
                        <SecondLevelListItem
                            id={menuItem.id}
                            key={menuItem.key}
                            className={menuItemIsActive(menuItem) ? 'active' : ''}
                            onClick={() => menuItemClick(menuItem)}
                        >
                            <SecondLevelListItemText primary={menuItem.label}/>
                        </SecondLevelListItem>
                    ))}
                </SecondLevelList>
            </>
        )
    }

    const toggleSubMenu = (menuItem: MenuItem | undefined) => {
        setState((prevState) => {
            return {
                ...prevState,
                clickedMenuItem: menuItem,
            }
        })
    }

    const toggleMainMenu = () => {
        setState((prevState) => {
            const newOpen = !prevState.open
            setSidebarOpenCSSVariable(newOpen)
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 301)
            onChangeOpen?.(newOpen)
            return {
                ...prevState,
                open: newOpen,
            }
        })
    }
    const defaultItem =  getRouteEntry({label: "New Crunch", route: '/', icon: <AddIcon/>, id: 'menu__home'});
    const menuItemClick = (menuItem: MenuItem) => {
        if (menuItem.children) {
            toggleSubMenu(menuItem)
            return
        }
        if (menuItem.route) {
            navigate(menuItem.route)
        }
        toggleSubMenu(undefined)
    }
    return (
        <div>
            <SecondLevelDrawer
                id={'main_menu__second_level'}
                anchor={'left'}
                onClose={() => toggleSubMenu(undefined)}
                open={state.clickedMenuItem !== undefined}
                hideBackdrop={false}
                variant={'temporary'}
                className={state.open ? 'mainOpen' : ''}
                keepMounted
            >
                {renderSecondLevelContent()}
            </SecondLevelDrawer>
            <Drawer variant="permanent" open={state.open} id={'main_menu'}>
                <MenuLogo className={openOrClosedClassName}>
                    {/*logo*/}
                    <span>{state.open ? projectTitle : 'RC AI'}</span>
                </MenuLogo>
                <NewChatButton
                    className={`${openOrClosedClassName} ${menuItemIsActive(defaultItem) ? 'active' : ''}`}
                    onClick={() => menuItemClick(defaultItem)}
                >
                    <MenuDrawerListItemIcon>{defaultItem.icon}
                    </MenuDrawerListItemIcon>
                    <span>{defaultItem.label}</span>
                </NewChatButton>
                <TopList>
                    {menuItems.map((menuItem, index) => (
                        <ListItem
                            id={menuItem.id}
                            key={menuItem.key}
                            className={`${openOrClosedClassName} ${menuItemIsActive(menuItem) ? 'active' : ''}`}
                            onClick={() => menuItemClick(menuItem)}
                        >

                            <MenuDrawerListItemIcon
                                className={`${openOrClosedClassName} ${menuItemIsActive(menuItem) ? 'active' : ''}`}
                            >
                                {menuItem.icon}
                            </MenuDrawerListItemIcon>
                            <MenuDrawerListItemText primary={menuItem.label}/>

                        </ListItem>
                    ))}
                    {chatMenuItems.map((menuItem) => (
                        <ListItem
                            id={menuItem.id}
                            key={menuItem.key}
                            className={`${openOrClosedClassName} ${menuItemIsActive(menuItem) ? 'active' : ''}`}
                            onClick={() => menuItemClick(menuItem)}
                        >
                            <MenuDrawerListItemIcon
                                className={`${openOrClosedClassName} ${menuItemIsActive(menuItem) ? 'active' : ''}`}
                            >
                                {menuItem.icon}
                            </MenuDrawerListItemIcon>
                            <MenuDrawerListItemText primary={menuItem.label}/>
                        </ListItem>
                    ))}
                </TopList>
                <BottomList>
                    {bottomMenuItems.map((menuItem) => {
                        if (menuItem.renderItem) {
                            return <React.Fragment
                                key={menuItem.key}>{menuItem.renderItem(openOrClosedClassName)}</React.Fragment>
                        }
                        return (
                            <MenuDrawerBottomListItem
                                key={menuItem.key}
                                id={menuItem.id}
                                className={menuItemIsActive(menuItem) ? 'active' : ''}
                                onClick={() => menuItemClick(menuItem)}
                            >
                                <MenuDrawerListItemIcon
                                    className={`${openOrClosedClassName} ${menuItemIsActive(menuItem) ? 'active' : ''}`}
                                >
                                    {menuItem.icon}
                                </MenuDrawerListItemIcon>
                                <MenuDrawerListItemText primary={menuItem.label}/>
                            </MenuDrawerBottomListItem>
                        )
                    })}
                </BottomList>
                <CloseButton
                    className={`${openOrClosedClassName} items${bottomMenuItems.length} `}
                    onClick={toggleMainMenu}
                >
                    <ChevronRightIcon/>
                </CloseButton>
            </Drawer>
        </div>
    )
}
