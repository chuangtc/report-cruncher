import {ofType} from 'redux-observable'
import {catchError, switchMap} from 'rxjs/operators'
import {Epics} from "../../store/store.types";
import {
    AvailableNotficationStatus,
    getNotificationActionPayload,
    showNotification,
} from "../../store/notificationSlice";
import {uploaderSlice} from "./uploader.reducer";
import {UploaderService} from "./uploader.service";

const sliceToUse = uploaderSlice

const uploadFiles$: Epics = (action$, state$) =>
    action$.pipe(ofType(sliceToUse.actions.uploadFiles)).pipe(
        switchMap((action: any) => {
            if (action.payload.length == 0) {
                return [showNotification(
                    getNotificationActionPayload('THERE IS NO FILE TO BE UPLOADED', AvailableNotficationStatus.warning)
                ), sliceToUse.actions.handleError(),]
            }
            return UploaderService.uploadFile(action.payload[0]).pipe(
                switchMap((response: any) => {

                    console.log(response)
                    if (response.success === false) {
                        return [showNotification(
                            getNotificationActionPayload(response.error, AvailableNotficationStatus.error)
                        ), sliceToUse.actions.handleError(),]
                    }
                    return [sliceToUse.actions.setUploadSuccess(response),
                        showNotification(
                            getNotificationActionPayload('File uploaded successfully', AvailableNotficationStatus.success)
                        )
                    ]
                }),
                catchError(() => [showNotification(
                    getNotificationActionPayload('Error occurred, please try again later', AvailableNotficationStatus.warning),
                ),
                    sliceToUse.actions.handleError(),]),
            )
        }),
    )

export const uploaderEffects = [uploadFiles$]
