import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UploaderSliceState {
    files: Array<File>,
    isUploading: boolean,
    uploadProgress: number,
    isUploadSuccess: boolean,

    fileName?: string
    uploadError: string | null,
}

export const getInitialState = (): UploaderSliceState => ({
    files: [],
    isUploading: false,
    fileName: undefined,
    uploadProgress: 0,
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
        setUploadSuccess:  (state) => {
            state.isUploadSuccess = false
        }
    }
})
