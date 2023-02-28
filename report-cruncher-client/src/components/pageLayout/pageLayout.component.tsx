import React, {useMemo} from "react";
import {MenuItem} from "./pageLayout.types";
import {MenuDrawer, MenuDrawerProps} from "./drawer";
import {Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {userSlice} from "../../store/user.slice";
import GridViewIcon from '@mui/icons-material/GridView';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';

const getRouteEntry = ({
                           label,
                           route,
                           id,
                           icon,
                           children,
                       }: {
    label: string
    route: string
    id?: string
    icon?: React.ReactNode
    children?: Array<MenuItem>
}): MenuItem => {
    return {
        id: id,
        key: route,
        label: label,
        icon: icon,
        route: route,
        activeOnRoutes: [
            {
                route: route,
                end: !children,
            },
        ],
        children: children,
    }
}
export const PageLayoutComponent = () => {
    const user = useAppSelector((state) => state.user.user)
    const sidebarOpen = useAppSelector((state) => state.user.sidebarOpen)
    const dispatch = useAppDispatch()

    const saveNewOpen = (newOpen: boolean) => {
        dispatch(userSlice.actions.setSidebarOpen(newOpen))
    }

    const menuItems: MenuItem[] = useMemo(() => {
        const result: MenuItem[] = [
            getRouteEntry({label: "Home", route: '/', icon: <GridViewIcon/>, id: 'menu__home'}),
        ]

        return result
    }, [])

    const chatItems: MenuItem[] = useMemo(() => {
        const result: MenuItem[] = [
            getRouteEntry({label: "Chat", route: '/chat', icon: <ChatIcon/>, id: 'menu__chat'}),
        ]

        return result
    }, [])

    const bottomMenuItems: MenuItem[] = useMemo(() => {
        const result: MenuItem[] = [
            getRouteEntry({label: user?.userId ?? "Abdel", route: '/user', icon: <PersonIcon/>, id: 'menu__user'}),
        ]
        return result
    }, [user])
    const drawerProps: MenuDrawerProps = useMemo(() => {
        return {
            initialOpen: sidebarOpen,
            onChangeOpen: saveNewOpen,
            projectTitle: 'Report Cruncher',
            menuItems: menuItems,
            chatMenuItems: chatItems,
            bottomMenuItems: bottomMenuItems,
        }
    }, [menuItems, chatItems, bottomMenuItems])

    return (
        <>
            <MenuDrawer {...drawerProps} />
            <Outlet/>
        </>
    )
}
