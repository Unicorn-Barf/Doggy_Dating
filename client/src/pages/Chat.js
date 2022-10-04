import React, { useState } from "react";
import Messages from '../components/Messages';
import Conversations from "../components/Conversations";



const Chat = ({ conversationId = '6337e95a5223045e30bf0203' }) => {
    
    const [toggleChat, setToggleChat] = useState(true);
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
                ? <Messages conversationId={conversationId} />
                : <Conversations />}


        </div>
    )
};

export default Chat;