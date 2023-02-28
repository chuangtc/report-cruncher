import {UserState} from './user.slice'
import {NotificationSliceState} from './notificationSlice'
import {Epic, StateObservable} from 'redux-observable'
import {UserInState} from './user.types'
import {UploaderSliceState} from "../pages/Home/uploader.reducer";

export interface GlobalState {
    user: UserState
    notification: NotificationSliceState
    uploader: UploaderSliceState
}

export type EpicMiddlewareDependencies = {}

export type Epics = Epic<any, any, GlobalState, EpicMiddlewareDependencies>

export const getUserFromState = (state$: StateObservable<GlobalState>): UserInState | undefined => {
    return state$.value.user.user
}
