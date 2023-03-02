import React, {useEffect, useMemo} from "react";
import {MenuItem} from "./pageLayout.types";
import {MenuDrawer, MenuDrawerProps} from "./drawer";
import {Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {userSlice} from "../../store/user.slice";
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import {chatSlice} from "./chat.slice";

export const getRouteEntry = ({
                                  label,
                                  route,
                                  uploadName,
                                  id,
                                  icon,
                                  children,
                              }: {
    label: string
    route: string
    uploadName?: string
    id?: string
    icon?: React.ReactNode
    children?: Array<MenuItem>
}): MenuItem => {
    return {
        id: id,
        key: route,
        uploadName: uploadName,
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
    const chatState = useAppSelector((state) => state.chat)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(chatSlice.actions.setChatRooms([getRouteEntry({
            label: "Chat",
            route: '/chat/0',
            icon: <ChatIcon/>,
            id: 'menu__chat'
        })]))
    }, [])

    const saveNewOpen = (newOpen: boolean) => {
        dispatch(userSlice.actions.setSidebarOpen(newOpen))
    }

    const menuItems: MenuItem[] = useMemo(() => {
        const result: MenuItem[] = []

        return result
    }, [])

    const chatItems: MenuItem[] = useMemo(() => {
        const result: MenuItem[] = chatState.chatRooms

        return result
    }, [chatState.chatRooms])

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
