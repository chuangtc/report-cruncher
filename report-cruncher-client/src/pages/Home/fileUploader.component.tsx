import React, {useState} from "react";
import {Button} from "@mui/material";

export const FileUploaderComponent = () => {
    const [filesToUpload, setFilesToUpload] = useState<any[]>([]);

    const handleFilesChange = (files: any) => {
        // Update chosen files
        setFilesToUpload([...files]);
    };

    const uploadFiles = () => {
        // Create a form and post it to server
        let formData = new FormData();
        filesToUpload.forEach((file) => formData.append("files", file));

        // fetch("/file/upload", {
        //     method: "POST",
        //     body: formData
        // });
    };

    return (
        <>
            <Button onClick={uploadFiles} variant="contained" id="uploadButton">
                Upload
            </Button>
        </>
    );
}
