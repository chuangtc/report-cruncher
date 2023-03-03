import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UploaderSliceState {
    files: Array<File>,
    isUploading: boolean,
    uploadProgress: number,
    isUploadSuccess: boolean,

    fileName?: string

    gptResponse?: string,

    uploadError: string | null,
}

export const getInitialState = (): UploaderSliceState => ({
    files: [],
    isUploading: false,
    fileName: undefined,
    uploadProgress: 0,
    gptResponse: undefined,
    uploadError: null,
    isUploadSuccess: false,
})

export const uploaderSlice = createSlice({
    name: 'uploader',
    initialState: getInitialState(),
    reducers: {
        addFile: (state, action: PayloadAction<{ file: File }>) => {
            state.files.push(action.payload.file)
        },
        uploadFiles: (state, action: PayloadAction<Array<File>>) => {
            state.isUploading = true
            state.fileName = action.payload[0].name
        },
        handleError: (state ) => {
            state.isUploading = false
        },
        handleSuccess: (state) => {
            state.isUploading = false
            state.isUploadSuccess = true
        },
        setUploadSuccess:  (state, action  ) => {
            state.isUploading = false
            state.isUploadSuccess = true
            state.gptResponse = action.payload

        }
    }
})
