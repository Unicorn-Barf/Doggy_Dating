import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Messages from '../components/Messages';
import Conversations from "../components/Conversations";
import { getSavedDogArr, getCurrentDogIndex } from '../utils/localStorage';


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
                    <button
                        onClick={() => setToggleChat(!toggleChat)}
                    >
                        Back to Conversations
                    </button>
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