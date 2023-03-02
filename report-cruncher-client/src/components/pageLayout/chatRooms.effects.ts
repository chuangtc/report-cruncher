import {Epics} from "../../store/store.types";
import {ofType} from "redux-observable";
import {switchMap} from "rxjs/operators";
import {
    AvailableNotficationStatus,
    getNotificationActionPayload,
    showNotification
} from "../../store/notificationSlice";
import {chatSlice} from "./chat.slice";

const sliceToUse = chatSlice
const deleteChatRoomEffects$: Epics = (action$, state$) =>
    action$.pipe(ofType(sliceToUse.actions.deleteChatRoom)).pipe(
        switchMap((action: any) => {
            // TODO send the message to the server
            if (action.payload.length == 0) {
                return [showNotification(
                    getNotificationActionPayload('Chat was not deleted ', AvailableNotficationStatus.error)
                ),]
            }
            return [sliceToUse.actions.handleDeleteChatRoomSuccess(action.payload),
                showNotification(
                    getNotificationActionPayload('Chat was deleted successfully', AvailableNotficationStatus.success)
                )];
        }),
    )

export const chatRoomsEffects = [deleteChatRoomEffects$]
