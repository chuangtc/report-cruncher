import {MenuItem} from "./pageLayout.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ChatSliceState {
    chatRooms: MenuItem[]
    loading: boolean

}

const initialState: ChatSliceState = {
    chatRooms: [],
    loading: false
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatRooms: (state, action) => {
            state.chatRooms = action.payload
        },
        deleteChatRoom: (state, action: PayloadAction<{ id: string }>) => {
            state.loading = true
        },
        handleDeleteChatRoomSuccess: (state, action: PayloadAction<{ id: string }>) => {
            state.chatRooms = state.chatRooms.filter(room => !room.route?.includes(`chat/${action.payload.id}`))
            state.loading = false
        },
        addChatRoom: (state, action) => {
            state.chatRooms.push(action.payload)
        }

    }
})
