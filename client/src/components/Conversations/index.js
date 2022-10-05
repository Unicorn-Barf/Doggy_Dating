import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATIONS_BY_DOG_ID } from '../../utils/queries';
import { GET_CONVERSATIONS_SUB } from '../../utils/subscriptions';
import { getSavedDogArr, getCurrentDogIndex } from '../../utils/localStorage';


const Conversations = ({ setConversationId, setToggleChat }) => {
    const navigate = useNavigate();
    const dogId = getSavedDogArr()[getCurrentDogIndex()]._id;
    console.log(dogId);

    // Query for all Conversations
    // Use subscribe to more for subscriptions to updates
    const convosQuery = useQuery(GET_CONVERSATIONS_BY_DOG_ID, {
        variables: { dogId },
    });

    convosQuery.subscribeToMore({
        document: GET_CONVERSATIONS_SUB,
        variables: { dogId },
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newConversations = subscriptionData;
            return newConversations;
        }
    })


    let convos = convosQuery.data?.getAllConversationsByDogId || [];
    console.log(convos);

    const handleChatRoute = (event) => {
        console.log(event.target.dataset.convoid);
        setConversationId(event.target.dataset.convoid);
        setToggleChat(true);
    }

    return (
        <div>
            <h1>These are your Conversations</h1>
            {convos.map((convo) => {
                return (
                        <h2
                            key={convo._id}
                            data-convoid={convo._id}
                            onClick={handleChatRoute}
                        >
                            {convo._id}
                        </h2>
                )
            })
            }
        </div>

    )
};

export default Conversations;