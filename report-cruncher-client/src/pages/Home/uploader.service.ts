// using fetch upload the file to the server

import {axiosObservable} from "../../utils/requestUtils";
import {AxiosRequestConfig} from 'axios';

const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: 'http://localhost:8000/v1/dataloader',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    return axiosObservable(requestConfig);
}

export const UploaderService = {
    uploadFile
}
