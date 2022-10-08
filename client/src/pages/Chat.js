import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Messages from '../components/Messages';
import Conversations from "../components/Conversations";
import { getSavedDogArr, getCurrentDogIndex } from '../utils/localStorage';
import { IconButton, Grid, Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const Chat = ({ convoId = null, toggle = false }) => {
    const { _id: myDogId, name: myDogName } = getSavedDogArr()[getCurrentDogIndex()];
    let initialConvoId = useLocation().state?.convoId || convoId;
    let initialToggle = useLocation().state?.toggle || toggle;
    const [toggleChat, setToggleChat] = useState(initialToggle);
    const [conversationId, setConversationId] = useState(initialConvoId);
    console.log(conversationId, toggleChat);

    return (
        <Grid container xs={12}>
            <Grid item>
                <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    <h1>Chat Screen</h1>
                    <h2>Dog Thoughts 💭</h2>
                    {toggleChat
                        ? (
                            <Stack>
                            <Button
                                size="small" variant="contained" item xs={2}
                                onClick={() => setToggleChat(!toggleChat)}
                            >
                                Back to Chats
                            </Button>
                            </Stack>
                        )
                        : ''
                    }


                    {toggleChat
                        ? <Messages
                            myDogName={myDogName}
                            myDogId={myDogId}
                            conversationId={conversationId}
                        />
                        : <Conversations
                            myDogName={myDogName}
                            setConversationId={setConversationId}
                            setToggleChat={setToggleChat}
                        />}


                </div>
            </Grid>
        </Grid>
    )
};

export default Chat;