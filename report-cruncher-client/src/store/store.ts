import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {combineEpics, createEpicMiddleware} from 'redux-observable'
import {EpicMiddlewareDependencies, GlobalState} from "./store.types";
import {notificationSlice} from "./notificationSlice";
import {userSlice} from "./user.slice";
import {notificationsEffects} from "./notification.effects";
import {uploaderEffects} from "../pages/Home/uploader.effects";
import {uploaderSlice} from "../pages/Home/uploader.reducer";
import {chatSlice} from "../components/pageLayout/chat.slice";
import {chatPageSlice} from "../pages/Chat/chatPage.slice";
import {chatPageEffects} from "../pages/Chat/chatPage.effects";

const reducer = combineReducers({
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
    uploader: uploaderSlice.reducer,
    chat: chatSlice.reducer,
    chatPage: chatPageSlice.reducer
})

const epics = combineEpics(
    ...notificationsEffects,
    ...uploaderEffects,
    ...chatPageEffects,
)

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, any, EpicMiddlewareDependencies>({})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            thunk: true,
            serializableCheck: {},
        }),
        epicMiddleware,
    ],
})

epicMiddleware.run(epics)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector
