import {ofType} from 'redux-observable'
import {exhaustMap, switchMap} from 'rxjs/operators'
import {notificationSlice, ShowNotificationAction} from './notificationSlice'
import {waitFor} from '../utils/waitUtil'
import {Epics} from './store.types'

const autoHideNotification$: Epics = (action$) =>
    action$.pipe(ofType(notificationSlice.actions.showNotification)).pipe(
        switchMap((action: ShowNotificationAction) => {
            if (!action.payload.autoHideAfter) {
                return []
            }

            return waitFor(action.payload.autoHideAfter).pipe(
                exhaustMap(() => [notificationSlice.actions.dismissNotification({key: action.payload.key})]),
            )
        }),
    )

export const notificationsEffects = [autoHideNotification$]
