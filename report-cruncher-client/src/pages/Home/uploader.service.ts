// using fetch upload the file to the server

import {axiosObservable} from "../../utils/requestUtils";
import {AxiosRequestConfig} from 'axios';
import {environment} from "../../constants/environment";

const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${environment.API.BACKEND_URL}/v1/dataloader`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        },
    };

    return axiosObservable(requestConfig);
}

export const UploaderService = {
    uploadFile
}
