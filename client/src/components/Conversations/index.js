import React, { useState } from 'react';
import { useMutation, useQuery, useSubscription, gql } from '@apollo/client';
import { GET_CONVERSATIONS_BY_DOG_ID } from '../../utils/queries';

const GET_CONVERSATIONS_SUB = gql`
`;

// Testing Variables
const dogId = '63373a64b8c198305855caa3';


const Conversations = () => {

    // Subscribe to New Conversations Data
    // const convoSub = useSubscription(GET_CONVERSATIONS_SUB);
    // Query for all Conversations
    const { data } = useQuery(GET_CONVERSATIONS_BY_DOG_ID, {
        variables: { dogId },
    });

    
    let convos = data?.getAllConversationsByDogId || [];
    console.log(data);

    return (
        <div>
            <h1>These are your Conversations</h1>
            {convos.map((convo) => {
                return ( <h2 key={convo._id}>{convo._id}</h2>)})
            }
        </div>

    )
};

export default Conversations;