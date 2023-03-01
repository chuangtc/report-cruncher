import React from 'react';
import {Button, styled} from "@mui/material";
import BackupIcon from '@mui/icons-material/Backup';
import {useDispatch} from "react-redux";
import {uploaderSlice} from "./uploader.reducer";
import {useAppSelector} from "../../store/store";
import {useNavigate} from "react-router-dom";

const ContainerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const DragAndDropFileUploaderComponent = () => {
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const state = useAppSelector(state => state.uploader);
    const [filesToUpload, setFilesToUpload] = React.useState<Array<File>>([]);

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // handle dropped files here
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.items[0].getAsFile()
            setFilesToUpload(file ? [file] : []);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // handle uploaded files here
        const uploadedFile = e.target.files && e.target.files[0];
        if (uploadedFile) {
            setFilesToUpload([uploadedFile]);
            // handle uploaded file here
        }

    };

    const handleSubmit = () => {
        dispatcher(uploaderSlice.actions.uploadFiles(filesToUpload))
        // delay one minut
        if (state.isUploading) return;
        if (filesToUpload.length === 0) return;
        setTimeout(() => {
            navigate('/chat');
        }, 2000);
    };

    return (
        <ContainerWrapper>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 1000,
                    height: 400,
                    border: 'dotted',
                    borderRadius: 10,
                    margin: '0 auto'
                }}
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
            >

                <BackupIcon
                    sx={{
                        fontSize: 80,
                    }}
                />
                <label
                    htmlFor="fileUpload"
                    style={{
                        marginTop: 10,
                        cursor: 'pointer',
                        color: '#3AA1AF',
                        fontSize: '16px',
                        fontWeight: '700'
                    }}
                >
                    Click to upload
                </label>
                <input
                    hidden
                    id='fileUpload'
                    accept=".pdf"
                    type="file"
                    onChange={handleFileUpload}
                />
                <p
                    style={{
                        marginTop: 10,
                        fontSize: '16px'
                    }}>
                    or drag and drop PDF
                </p>

                {filesToUpload &&
                    <p
                        style={{
                            marginTop: 10
                        }}
                    >
                        {filesToUpload.map((file) => file.name)}
                    </p>
                }
            </div>
             <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={state.isUploading}
                sx={{
                    marginTop: '30px',
                    fontSize: '15px',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '10px 30px',
                }}
            >
                CRUNCH IT
            </Button>
        </ContainerWrapper>
    );
};
