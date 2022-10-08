import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Messages from '../components/Messages';
import Conversations from "../components/Conversations";
import { getSavedDogArr, getCurrentDogIndex } from '../utils/localStorage';
import { IconButton, Grid, Box, Button } from '@mui/material';

const Chat = ({ convoId = null, toggle = false }) => {
    const { _id: myDogId, name: myDogName } = getSavedDogArr()[getCurrentDogIndex()];
    let initialConvoId = useLocation().state?.convoId || convoId;
    let initialToggle = useLocation().state?.toggle || toggle;
    const [toggleChat, setToggleChat] = useState(initialToggle);
    const [conversationId, setConversationId] = useState(initialConvoId);
    console.log(conversationId, toggleChat);
    return (
        <div>
            <h1>Chat Screen</h1>
            <h2>Dog Thoughts 💭</h2>
            {toggleChat
                ? (
                    <Button
                    size="small" variant="contained"
                        onClick={() => setToggleChat(!toggleChat)}
                    >
                        Back to Chats
                    </Button>
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
    )
};

export default Chat;