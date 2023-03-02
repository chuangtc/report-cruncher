import {UserState} from './user.slice'
import {NotificationSliceState} from './notificationSlice'
import {Epic, StateObservable} from 'redux-observable'
import {UserInState} from './user.types'
import {UploaderSliceState} from "../pages/Home/uploader.reducer";
import {ChatSliceState} from "../components/pageLayout/chat.slice";
import {ChatPageSliceState} from "../pages/Chat/chatPage.slice";

export interface GlobalState {
    user: UserState
    notification: NotificationSliceState
    uploader: UploaderSliceState
    chat: ChatSliceState
    chatPage: ChatPageSliceState
}

export type EpicMiddlewareDependencies = {}

export type Epics = Epic<any, any, GlobalState, EpicMiddlewareDependencies>

export const getUserFromState = (state$: StateObservable<GlobalState>): UserInState | undefined => {
    return state$.value.user.user
}
