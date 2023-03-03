import React, {useEffect, useState} from 'react';
import {Button, Container, Grid, styled, TextField} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uploaderSlice} from "../Home/uploader.reducer";
import {useAppSelector} from "../../store/store";
import {chatPageSlice, Message} from './chatPage.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import {chatSlice} from "../../components/pageLayout/chat.slice";
import {environment} from "../../constants/environment";

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
const SummaryTextStyled: any = styled('div')`
  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 200px;
    }
  }
  @keyframes blinkTextCursor {
    from {
      border-right-color: hsl(0, 0%, 80%);
    }
    to {
      border-right-color: transparent;
    }
  }
  color: ${(props) => (props.theme.palette.mode === 'light' ? '#fff' : '#000')};
  margin-left: 5px;

  span {
    position: relative;
    width: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) => (props.theme.palette.mode === 'light' ? '#000' : '#000')};
    animation: typewriter 1s steps(44) 1s 1 normal both,
    blinkTextCursor 200ms infinite;

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

    const fetchChatData = async (message: string) => {
        const headers = {
            "Content-Type": "application/json",
        };

        const body = JSON.stringify({question: message});

        const response = await fetch(`${environment.API.BACKEND_URL}/v1/chat`, {
            method: "POST",
            headers,
            body,
        });

        if (response.ok) {
            const result = await response.json();
            // handle success
            console.log(result);

            const message: Message = {
                text: result.text,
                isGpt: true,
            }
            dispatch(chatPageSlice.actions.sendMessage({message: message}));
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
                    <Grid container spacing={2}>
                        <Grid item xs={6} style={{
                            height: 'calc(100vh - 89px)',
                            overflow: 'auto'
                        }}>
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
                                    paddingTop: '10px',
                                    bottom: '0',
                                    minWidth: '50%',
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
                        </Grid>

                        <Grid item xs={6}>
                            <h3 style={{
                                color: '#3AA1AF',
                            }}>Summarization of {chatPageState.pageTitle} </h3>
                            <SummaryTextStyled className={'gpt-summary'}>
                                <span>{uploaderState.gptResponse}</span>

                            </SummaryTextStyled>

                        </Grid>
                    </Grid>

                </>
            }
        </>
    );
};
