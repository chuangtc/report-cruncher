import {useAppDispatch, useAppSelector} from "../../store/store";
import {notificationSlice} from "../../store/notificationSlice";
import {styled} from "@mui/material";
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import { motion } from 'framer-motion'
import React from "react";

export const Notifications = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector((state) => state.notification)

    const onCloseMessage = (key: string) => {
        dispatch(notificationSlice.actions.dismissNotification({key: key}))
    }

    return <NotificationsComponent messages={state.notifications} onCloseMessage={onCloseMessage}/>
}


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export interface NotificationComponent {
    key: string
    message: string
    status: 'success' | 'info' | 'warning' | 'error'
}

type NotificationsProps = {
    messages: NotificationComponent[]
    onCloseMessage?: (notificationKey: string) => void
}

const StyledContainer = styled('div')`
  z-index: 100000;
  position: fixed;
  top: 0;
  right: 0;
  padding-right: 20px;
  padding-top: 20px;
  pointer-events: none;

  .MuiAlert-root {
    pointer-events: all;
    background: ${(props) => (props.theme.palette.mode === 'light' ? '#fff' : '#00313a')};
    margin-top: 20px;
    width: 400px;
  }
`
export const NotificationsComponent = ({messages, onCloseMessage}: NotificationsProps) => {
    return (
        <StyledContainer>
            <motion.div animate={{transition: {staggerChildren: 0.07, delayChildren: 0.2}}}>
                {messages.map((message) => {
                    const alertProps: AlertProps = {
                        variant: 'outlined',
                        severity: message.status,
                    }

                    if (onCloseMessage) {
                        alertProps.onClose = () => onCloseMessage(message.key)
                    }

                    return (
                        <motion.div
                            layout
                            key={message.key}
                            animate={{
                                y: 0,
                                opacity: 1,
                                transition: {
                                    type: 'Tween',
                                    stiffness: 100,
                                },
                            }}
                        >
                            <Alert {...alertProps}>
                                <div dangerouslySetInnerHTML={{__html: message.message}}/>
                            </Alert>
                        </motion.div>
                    )
                })}
            </motion.div>
        </StyledContainer>
    )
}
