import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UploaderSliceState {
    files: Array<File>,
    isUploading: boolean,
    uploadProgress: number,
    uploadError: string | null,
}

export const getInitialState = (): UploaderSliceState => ({
    files: [],
    isUploading: false,
    uploadProgress: 0,
    uploadError: null,
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
        },
        handleError: (state ) => {
            state.isUploading = false
        },
        handleSuccess: (state) => {
            state.isUploading = false
        }
    }
})
