import {Epic, ofType} from 'redux-observable'
import {exhaustMap, switchMap} from 'rxjs/operators'
import {userServiceFunctions} from './user.service'
import {AvailableNotficationStatus, getNotificationActionPayload, showNotification} from './notificationSlice'
import {userSlice} from "./user.slice";

const sliceToUse = userSlice


const getUser$: Epic = (action$) =>
    action$.pipe(
        ofType(sliceToUse.actions.getUser),
        switchMap(() => {
            return userServiceFunctions.getUser().pipe(
                exhaustMap((response) => {
                    const actions: Array<any> = []

                    actions.push(
                        showNotification(
                            getNotificationActionPayload('test', AvailableNotficationStatus.warning),
                        ),
                    )
                    return actions
                }),
            )
        }),
    )

export const userEffects = [
    getUser$,
]
