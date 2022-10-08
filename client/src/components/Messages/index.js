import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
// Material UI Components
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// GraphQL Strings
import { GET_CONVERSATION_BY_ID } from '../../utils/queries';
import { POST_MESSAGE } from '../../utils/mutations';
import { GET_MESSAGES_SUB } from '../../utils/subscriptions';

import SendIcon from '@mui/icons-material/Send';
import '../../styles/root.css';

const Text = ({ messages, myDogId }) => {

  return (
    <div style={{ marginBottom: "3rem" }}>
      {messages.map(({ dogId, dogName, message, messageId }) => {
        return (
          <div key={messageId} style={{ textAlign: myDogId === dogId ? "right" : "left" }}>
            <p style={{ marginBottom: "0.2rem", textAlign: myDogId === dogId ? "right" : "left", fontSize: "14px" }}>{`${dogName} barked:`}</p>
            <Chip style={{ fontSize: "1rem", padding: "0.2rem" }} color={myDogId === dogId ? "success" : "secondary"} label={message} />
          </div>
        )
      })}
    </div>
  )
}

const Messages = ({ conversationId, myDogId, myDogName }) => {
  // Local State
  const [text, setText] = useState("");

  // GraphQL Hooks
  const [postMessage] = useMutation(POST_MESSAGE);

  const convoQuery = useQuery(GET_CONVERSATION_BY_ID,
    { variables: { conversationId } });

  // Handle subscription for messages
  convoQuery.subscribeToMore({
    document: GET_MESSAGES_SUB,
    variables: { conversationId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const messages = subscriptionData.data.messageSent.messages;
      return {
        getConversationById: [...messages],
      };
    }
  });

  let messages = convoQuery.data?.getConversationById || [];

  const sendMessage = async () => {
    const PostMessage = {
      dogId: myDogId,
      dogName: myDogName,
      message: text
    };
    if (text.length > 0) {

      try {
        await postMessage({
          variables: {
            message: { ...PostMessage },
            conversationId
          }
        });
        setText("");
      } catch (error) {
        console.log(error);
      };

    } else {
      // trigger modal if time affords
    }

  }

  return (
    <Container style={{ marginBottom: "200px" }}>
      <h4 style={{ textAlign: "center", marginBottom: "3rem" }}>Welcome to Dog Thoughts!</h4>
      <Text myDogId={myDogId} messages={messages} />
      <Grid container spacing={2}>
        <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
          <Grid item xs={9}>
            <TextField
              onChange={(e) => {
                setText(e.target.value)
              }}
              value={text} size="small"
              fullWidth
              variant="outlined" r
              equired
              label="Type your message here."
              style={{ margin: "5px" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={sendMessage}
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#F8C630", color: "black" }}
            >
              Send
              <SendIcon />
            </Button>
          </Grid>
        </div>
      </Grid>
    </Container>
  )
};

export default Messages;