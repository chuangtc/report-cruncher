import {Epics} from "../../store/store.types";
import {ofType} from "redux-observable";
import {chatPageSlice} from "./chatPage.slice";
import {switchMap} from "rxjs/operators";
import {
    AvailableNotficationStatus,
    getNotificationActionPayload,
    showNotification
} from "../../store/notificationSlice";

const sliceToUse = chatPageSlice
const sendChatMessageEffects$: Epics = (action$, state$) =>
    action$.pipe(ofType(sliceToUse.actions.sendMessage)).pipe(
        switchMap((action: any) => {
            // TODO send the message to the server
            if (action.payload.length == 0) {
                return [showNotification(
                    getNotificationActionPayload('Message was not sent successfully', AvailableNotficationStatus.error)
                ),]
            }
            return [sliceToUse.actions.handleSendMessageSuccess(),]
        }),
    )

export const chatPageEffects = [sendChatMessageEffects$]
