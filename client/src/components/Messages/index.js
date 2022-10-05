import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { storeDog, getDog } from "../../slices/dogSlice";
import { useMutation, useSubscription, useQuery } from '@apollo/client';
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


const Text = ({ messages }) => {
  const dispatch = useDispatch();
  const dog = useSelector(getDog);

  return (
    <div style={{ marginBottom: "5rem" }}>
      {messages.map(({ dogId, message, messageId, _id }) => {
        return (
          <div key={_id} style={{ textAlign: dog._id === dogId ? "right" : "left" }}>
            <p style={{ marginBottom: "0.3rem" }}>{`dogId: ${dogId} _id: ${_id}`}</p>
            <Chip style={{ fontSize: "0.9rem" }} color={dog._id === dogId ? "primary" : "secondary"} label={message} />
          </div>
        )
      })}
    </div>
  )
}

const Messages = ({ conversationId }) => {
  // Local State
  const [user, setUser] = useState("Victoria");
  const [text, setText] = useState("");
  console.log(conversationId, 'Messages Component');
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
      const newMessages = subscriptionData.data.messageSent.messages;
      return newMessages;
    }
  });

  let messages = convoQuery.data?.getConversationById || [];

  console.log(messages, 'DATAAAAAAAAAAAA!!');
  // if (!data) {
  //   return null;
  // }

  const sendMessage = async () => {
    const PostMessage = {
      dogId: "633803594950ea4a2c76c2b6",
      message: text
    };
    if (text.length > 0 && user.length > 0) {
      const { data } = await postMessage({
        variables: {
          message: { ...PostMessage },
          conversationId
        }
      });
      console.log(data);
      setText("");
    } else {
      alert("Missing fields!")
    }

  }

  return (
    <Container>
      <h3>Welcome to DevThoughts! A simple chat app for the GraphQL series!</h3>
      <Text messages={messages} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField onChange={(e) => {
            setUser(e.target.value)
          }} value={user} size="small" fullWidth variant="outlined" required label="Enter name" />
        </Grid>
        <Grid item xs={8}>
          <TextField onChange={(e) => {
            setText(e.target.value)
          }} value={text} size="small" fullWidth variant="outlined" required label="Enter message here" />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={sendMessage} fullWidth variant="contained" style={{ backgroundColor: "#60a820", color: "white" }}>Send</Button>
        </Grid>
      </Grid>
    </Container>
  )
};

export default Messages;