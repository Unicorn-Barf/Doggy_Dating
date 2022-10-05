import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Messages from '../components/Messages';
import Conversations from "../components/Conversations";



const Chat = () => {
    let initialConvoId = useLocation().state?.convoId || null;
    let initialToggle = useLocation().state?.toggle || false;
    const [toggleChat, setToggleChat] = useState(initialToggle);
    const [conversationId, setConversationId] = useState(initialConvoId);
    console.log(conversationId);
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
                : (
                    <button
                        onClick={() => setToggleChat(!toggleChat)}
                    >
                        Go to Message
                    </button>
                )}


            {toggleChat
                ? <Messages convoId={conversationId} />
                : <Conversations />}


        </div>
    )
};

export default Chat;