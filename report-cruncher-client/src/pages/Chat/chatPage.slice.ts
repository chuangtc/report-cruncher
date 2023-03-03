import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Message = {
    text: string
    isGpt: boolean
}

export interface ChatPageSliceState {
    messages: Array<Message>,
    isLoading: boolean,
    sendError: string | null,
    isFetching: boolean,
    fetchError: string | null,
    isFetchSuccess: boolean,
    isFetchingMore: boolean,
    fetchMoreError: string | null,
    isFetchMoreSuccess: boolean,

    pageTitle: string
}

export const getInitialState = (): ChatPageSliceState => ({
    messages: [{
        text: 'Hello, how can I help you?',
        isGpt: true
    }],
    isLoading: false,
    sendError: null,
    isFetching: false,
    fetchError: null,
    isFetchSuccess: false,
    isFetchingMore: false,
    fetchMoreError: null,
    isFetchMoreSuccess: false,
    pageTitle: "AI"
})

export const chatPageSlice = createSlice({
    name: 'chatPage',
    initialState: getInitialState(),
    reducers: {
        sendMessage: (state, action: PayloadAction<{ message: Message }>) => {
            state.isLoading = true
            state.messages.push(action.payload.message)

        },
        handleSendMessageSuccess: (state) => {
            state.isLoading = false
        },
        handleSendMessageError: (state) => {
            state.isLoading = false
            state.sendError = "error"
        },
        fetchMessages: (state) => {
            state.isFetching = true
        },
        setPageTitle: (state, action: PayloadAction<{ pageTitle: string | undefined }>) => {
            state.pageTitle = action.payload.pageTitle ?? "AI"
        }
    }
})
