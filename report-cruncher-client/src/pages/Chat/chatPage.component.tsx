import React, {useEffect, useState} from 'react';
import {Button, Container, styled, TextField} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uploaderSlice} from "../Home/uploader.reducer";
import {useAppSelector} from "../../store/store";
import {chatPageSlice, Message} from './chatPage.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import {chatSlice} from "../../components/pageLayout/chat.slice";

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

const TextAreaStyle = styled(TextField)`
  border-radius: 5px;
  width: 100%;
  padding: 11px;
  flex: 1;
  .MuiInputBase-root {
    padding: 10px 14px;
  }
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
export const ChatPageComponent = () => {
    const [state, setState] = useState<ChatPageState>({
        text: '',
    });
    const uploaderState = useAppSelector(state => state.uploader);
    const chatPageState = useAppSelector(state => state.chatPage);
    const dispatch = useDispatch();
    const chatState = useAppSelector((state) => state.chat)
    const {id} = useParams();
    const navigator = useNavigate();

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
    }, [id])
      
    const handleSubmit = () => {
        const message: Message = {
            text: state.text,
            isGpt: false,
        }
        dispatch(chatPageSlice.actions.sendMessage({message: message}));
        fetchChatData(state.text);
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

    const fetchChatData = async ( message: string ) => {
        const headers = {
            "Content-Type": "application/json",
        };
        
        const body = JSON.stringify({ message });
        
        const response = await fetch("/v1/chat", {
            method: "GET",
            headers,
            body,
        });
      
        if (response.ok) {
            const result = await response.json();
            // handle success
            console.log(result);
        } else {
            const error = await response.json();
            // handle error
            console.log(error);
        }
    };

    const ChatArea = () => {
        return (
            <>
                {
                    chatPageState.messages.map((item, index) => {
                        return (
                            <ChatAreaWrapper key={index}>
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

    const handleDeleteChat = () => {
        dispatch(chatSlice.actions.deleteChatRoom({id: `${id}`}))

        navigator('/')
    }
    const getDeleteIcon = () => {
        if (chatState.chatRooms.length > 1 && chatPageState.pageTitle !== 'Chat') {
            return (
                <DeleteIcon style={{
                    cursor: 'pointer',
                    color: 'red',
                }} onClick={handleDeleteChat}/>
            )
        }
    }
    return (
        <>
            {chatPageState.isLoading ?
                <CircularIndeterminate/> :
                <>
                    <Container
                        style={{
                            display: 'flex',
                            alignItems: 'center',

                        }}>
                        <h3 style={{
                            color: '#3AA1AF',
                        }}>Chatting with {chatPageState.pageTitle} </h3>
                        {getDeleteIcon()}
                    </Container>
                    <ChatArea/>
                    <form
                        noValidate
                        autoComplete={'off'}
                        style={{
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            position: 'fixed',
                            bottom: '0',
                            width: '-webkit-fill-available',
                            margin: '0 20px',
                        }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <TextAreaStyle
                            id="chat"
                            multiline
                            minRows={1}
                            maxRows={8}
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
