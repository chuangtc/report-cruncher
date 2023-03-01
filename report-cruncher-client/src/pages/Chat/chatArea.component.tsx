import React from 'react';
import { styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";
import { teal } from '@mui/material/colors';

interface InputFieldLayoutProps {
    children: React.ReactNode
}

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

export const ChatAreaComponent = () => {
    const [loading, setLoading] = React.useState(true);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [input, setInput] = React.useState("");

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    
    const handleSubmit = () => {
        console.log(input);
        setIsSubmitted(true);
    };
    
    const CircularIndeterminate = () => {
        return (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        );
    };
    
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(teal[600]),
        backgroundColor: teal[600],
        padding: '10px 30px',
        borderRadius: '5px',
        '&:hover': {
          backgroundColor: teal[900],
        },
        '&:disabled': {
            backgroundColor: teal[400],
            color: theme.palette.getContrastText(teal[400]),
            cursor: 'not-allowed',
        }
    }));
    
    const SendButton = () => {
        return (
            <ColorButton 
                disabled={loading || input.length === 0}
                variant="contained" 
                type="submit"
                >
                    Send
            </ColorButton>
        );
    };
    
    const TextArea = () => {
        return (
            <textarea
                style={{
                    outline: 'none',
                    width: '600px',
                    padding: '5px 10px',
                    fontSize: '16px',
                    border: `1px solid ${teal[600]}`,
                    resize: 'none',
                }}
                value={isSubmitted ? "" : input}
                onChange={(e) => setInput(e.target.value)}
            />
        );
    };
    
    const FormField = ({ children }: InputFieldLayoutProps) => {
        return (
            <form
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
                {children}
            </form>
        );
    };
    
    const InputField = () => {
        return (
            <>
                <FormField children={<><TextArea /><SendButton /></>}></FormField>
            </>
        );
    };
    
    const ChatArea = () => {
        return (
            <>
                <ChatAreaWrapper>
                    <UserTextWrapper>
                        <p>Hello</p>
                    </UserTextWrapper>
                </ChatAreaWrapper>
                <ChatAreaWrapper>
                    <GptTextWrapper>
                        <p>Hello! How can I assist you today?</p>
                    </GptTextWrapper>
                </ChatAreaWrapper>
            </>
        );
    };

    return (
        <>
            { loading ? 
                <CircularIndeterminate /> : 
                <>
                    <ChatArea />
                    <InputField />
                </>
            }
        </>
    );
};
