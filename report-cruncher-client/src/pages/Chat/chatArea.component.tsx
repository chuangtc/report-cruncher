import React, {useEffect, useState} from 'react';
import {Button, Container, styled, TextField} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uploaderSlice} from "../Home/uploader.reducer";
import {useAppSelector} from "../../store/store";
import {chatPageSlice, Message} from './chatPage.slice';

const GptTextWrapper = styled('div')`
  width: 100%;
  background-color: #D8D8D8;
  padding: 10px 100px;
`

const UserTextWrapper = styled('div')`
  width: 100%;
  background-color: #BFBFBF;
  padding: 10px 100px;
`

const ChatAreaWrapper = styled('div')`
  display: flex;
  align-items: center;
`

type ChatPageState = {
    text: string
}

const ColorButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText("#3AA1AF"),
    backgroundColor: "#3AA1AF",
    padding: '10px 30px',
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: "#3AA1AF",
    },
    '&:disabled': {
        backgroundColor: "#52B8C6",
        color: theme.palette.getContrastText("#3AA1AF"),
        cursor: 'not-allowed',
    }
}));
export const ChatAreaComponent = () => {
    const [state, setState] = useState<ChatPageState>({
        text: '',
    });
    const uploaderState = useAppSelector(state => state.uploader);
    const chatPageState = useAppSelector(state => state.chatPage);
    const dispatch = useDispatch();
    const chatState = useAppSelector((state) => state.chat)
    const {id} = useParams();
    useEffect(() => {
        if (uploaderState.isUploadSuccess) {
            dispatch(uploaderSlice.actions.setUploadSuccess());
        }
        if (id) {
            chatState.chatRooms.forEach((item) => {
                if (item.route?.includes(`chat/${id}`)) {
                    dispatch(chatPageSlice.actions.setPageTitle({pageTitle: item.uploadName}))
                }
            })
        }
    }, [])

    const handleSubmit = () => {
        const message: Message = {
            text: state.text,
            isGpt: false,
        }
        dispatch(chatPageSlice.actions.sendMessage({message: message}));
    };

    const CircularIndeterminate = () => {
        return (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        );
    };

    const SendButton = () => {
        return (
            <ColorButton
                disabled={chatPageState.isLoading || state.text.length === 0}
                variant="contained"
                type="submit"
            >
                Send
            </ColorButton>
        );
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => {
            return {
                ...prevState,
                text: e.target.value,
            }
        });
    }
    const ChatArea = () => {
        return (
            <>
                {
                    chatPageState.messages.map((item, index) => {
                        return (
                            <ChatAreaWrapper>
                                {item.isGpt ?
                                    <GptTextWrapper>
                                        <p>{item.text}</p>
                                    </GptTextWrapper> :
                                    <UserTextWrapper>
                                        <p>{item.text}</p>
                                    </UserTextWrapper>
                                }
                            </ChatAreaWrapper>
                        )
                    })
                }
            </>
        );
    };

    return (
        <>
            {chatPageState.isLoading ?
                <CircularIndeterminate/> :
                <>
                    <Container>
                        <h3>Joining {chatPageState.pageTitle} </h3>

                    </Container>
                    <ChatArea/>
                    <form
                        noValidate
                        autoComplete={'off'}
                        style={{
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                        }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <TextField
                            id="chat"
                            style={{
                                borderRadius: '5px',
                            }}
                            multiline
                            minRows={1}
                            value={state.text}
                            onChange={handleOnChange}
                        />
                        <SendButton/>
                    </form>
                </>
            }
        </>
    );
};
