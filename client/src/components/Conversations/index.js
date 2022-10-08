import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATIONS_BY_DOG_ID, GET_DOG_BY_DOG_ID } from '../../utils/queries';
import { GET_CONVERSATIONS_SUB } from '../../utils/subscriptions';
import { getSavedDogArr, getCurrentDogIndex } from '../../utils/localStorage';
import { Button } from '@mui/material';


const Conversations = ({ setConversationId, setToggleChat, myDogName }) => {

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
            for (let i = 0; i < prevConvos.length; i++) {
                if (prevConvos[i]._id === convo._id) return prev;
            };
            return {
                getAllConversationsByDogId: [convo, ...prevConvos],
            };
        }
    });


    let convos = convosQuery.data?.getAllConversationsByDogId || [];

    const handleChatRoute = (event) => {
        setConversationId(event.target.dataset.convoid);
        setToggleChat(true);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginTop: '3rem' }}>These are your conversations:</h2>
            {convos.map((convo) => {
                return (
                    <div
                        key={convo._id}
                        style={{ display: "flex", alignContent: "center", justifyContent: "center" }}
                    >
                        <img
                            src={convo.dogIds.find(dog => dog.name !== myDogName).images[0] || 'https://drive.google.com/uc?id=1s5JNJlVpC1YA0pZ1AyiHl94zfELmQlYW'}
                            style={{ backgroundSize: "cover", borderRadius: "50%", width: "60px", height: "60px", my: 1, alignSelf: "center", margin: "10px" }}
                            alt="dog profile pic"
                        />
                        <Button size="large" style={{ fontSize: '1.5rem' }}
                            key={convo._id}
                            data-convoid={convo._id}
                            onClick={handleChatRoute}
                        >
                            {convo.dogIds.map(dog => {
                                if (myDogName !== dog.name) return dog.name;
                            })}
                        </Button>
                    </div>
                )
            })
            }
        </div>

    )
};

export default Conversations;