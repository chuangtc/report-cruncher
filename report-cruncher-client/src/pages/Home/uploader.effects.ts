import {ofType} from 'redux-observable'
import {switchMap} from 'rxjs/operators'
import {Epics} from "../../store/store.types";
import {
    AvailableNotficationStatus,
    getNotificationActionPayload,
    showNotification,
} from "../../store/notificationSlice";
import {uploaderSlice} from "./uploader.reducer";

const uploadFiles$: Epics = (action$, state$) =>
    action$.pipe(ofType(uploaderSlice.actions.uploadFiles)).pipe(
        switchMap((action: any) => {
            if (action.payload.length == 0) {
                return [showNotification(
                    getNotificationActionPayload('THERE IS NO FILE TO BE UPLOADED', AvailableNotficationStatus.warning)
                ), uploaderSlice.actions.handleError(),]
            }
// TODO call the service to upload the file
            // if successfully redirect the user to the chat screeen
            return [showNotification(
                getNotificationActionPayload('File uploaded successfully', AvailableNotficationStatus.success)
            ), uploaderSlice.actions.handleSuccess(),]
        }),
    )

export const uploaderEffects = [uploadFiles$]
