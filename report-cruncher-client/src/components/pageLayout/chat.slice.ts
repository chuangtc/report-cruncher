import {MenuItem} from "./pageLayout.types";
import {createSlice} from "@reduxjs/toolkit";

export interface ChatSliceState {
    chatRooms : MenuItem[]

}

const initialState: ChatSliceState = {
    chatRooms: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatRooms: (state, action) => {
            state.chatRooms = action.payload
        },
        deleteChatRoom: (state, action) => {
            state.chatRooms = state.chatRooms.filter(room => room.key !== action.payload)
        },
        addChatRoom: (state, action) => {
            state.chatRooms.push(action.payload)
        }

    }
})
