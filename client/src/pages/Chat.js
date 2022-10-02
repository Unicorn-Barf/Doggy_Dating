import React, { useState } from "react";
import Messages from '../components/Messages';
import Conversations from "../components/Conversations";

const Chat = () => {
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
                ? <Messages />
                : <Conversations />}


        </div>
    )
};

export default Chat;