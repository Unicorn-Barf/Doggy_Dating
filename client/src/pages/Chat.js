import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Messages from '../components/Messages';
import Conversations from "../components/Conversations";
import { getSavedDogArr, getCurrentDogIndex } from '../utils/localStorage';
import { Box, Button, Stack, Paper, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../src/styles/root.css';

const Chat = ({ convoId = null, toggle = false }) => {
    const { _id: myDogId, name: myDogName } = getSavedDogArr()[getCurrentDogIndex()];
    let initialConvoId = useLocation().state?.convoId || convoId;
    let initialToggle = useLocation().state?.toggle || toggle;
    const [toggleChat, setToggleChat] = useState(initialToggle);
    const [conversationId, setConversationId] = useState(initialConvoId);
    console.log(conversationId, toggleChat);

    return (
        <div className="main-container">
            {/* <Grid container xs={12}>
                <Grid item style={{ justifyContent: "center" }}> */}
                    <Container maxWidth="lg">
                        <Paper elevation={3} sx={{ padding: 1, marginTop: 3 }}>
                            {/* <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}> */}
                                <h1>Dog Thoughts Chat 💭</h1>
                                <p>Chat with your dog friends and schedule a playdate!</p>
                                <Box
                                    component="form"
                                    sx={{
                                        "& > :not(style)": { width: "100%" },
                                        maxWidth: '100%', padding: "10px"
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    {toggleChat
                                        ? (
                                            <Stack
                                                direction="row"
                                                justifyContent="center"
                                            >
                                                <Button
                                                    size="small" variant="contained" item xs={2}
                                                    onClick={() => setToggleChat(!toggleChat)}
                                                >
                                                    <ArrowBackIcon />
                                                    Back to All Chats
                                                </Button>
                                            </Stack>
                                        ) : ''
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

                                </Box>
                            {/* </div> */}
                        </Paper>
                    </Container>
                {/* </Grid>
            </Grid> */}
        </div >
    )
};

export default Chat;