import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATIONS_BY_DOG_ID } from '../../utils/queries';
import { GET_CONVERSATIONS_SUB } from '../../utils/subscriptions';
import { getSavedDogArr, getCurrentDogIndex } from '../../utils/localStorage';


const Conversations = ({ setConversationId, setToggleChat }) => {

    const dogId = getSavedDogArr()[getCurrentDogIndex()]._id;

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
            const convo = subscriptionData.data.conversationUpdated;
            const prevConvos = prev.getAllConversationsByDogId;
            for (let i=0; i < prevConvos.length; i++) {
                if (prevConvos[i]._id === convo._id) return prev;
            };
            return {
                getAllConversationsByDogId: [ convo, ...prevConvos ],
            };
        }
    });


    let convos = convosQuery.data?.getAllConversationsByDogId || [];

    const handleChatRoute = (event) => {
        setConversationId(event.target.dataset.convoid);
        setToggleChat(true);
    };

    return (
        <div>
            <h2 style={{ marginTop: '3rem'}}>These are your Conversations</h2>
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