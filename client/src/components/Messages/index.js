import React, {useState} from 'react';

import { useMutation, useSubscription, gql} from '@apollo/client';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const GET_Mess = gql`
query Query($conversationId: ID!) {
  getConversationById(conversationId: $conversationId) {
    message
    dogId
  }
}
`;

const GET_MESSAGES = gql`
subscription MessageSent {
  messageSent {
    _id
    dogIds
    messages {
      dogId
      message
      createdAt
      messageId
    }
  }
}
`;

const POST_MESSAGE = gql`
mutation Mutation($conversationId: ID!, $message: PostMessage) {
  newMessage(conversationId: $conversationId, message: $message) {
    _id
    dogIds
    messages {
      messageId
      dogId
      message
      createdAt
    }
  }
}
`;

const Text = ({user}) =>{
    const {data} = useSubscription(GET_MESSAGES)
    console.log(data, 'DATAAAAAAAAAAAA!!');
    if(!data){
        return null;
    }
    return (
      <div style={{marginBottom:"5rem"}}>
        {data.messages.map(({id, user:messageUser, text})=>{
          return(
            <div key={id} style={{textAlign: user===messageUser?"right":"left"}}>
              <p style={{marginBottom:"0.3rem"}}>{messageUser}</p>
              <Chip style={{fontSize:"0.9rem"}} color={user===messageUser?"primary": "secondary"} label={text}/>
            </div>
          )
        })}
      </div>
     )
}

const Messages = () => {
    const [user, setUser] = useState("Victoria");
    const [text, setText] = useState("");
    const [messages, setMessages] = useState("")
    const [postMessage] = useMutation(POST_MESSAGE)
    const sendMessage = async () => {
      const PostMessage = {
        dogId: "633803594950ea4a2c76c2b6",
        message: text
      };
      console.log(PostMessage);
      if(text.length>0 && user.length >0){
        const { data } = await postMessage({
          variables:{
            message: {...PostMessage},
            conversationId: '6337e95a5223045e30bf0203'
          }
        });
        console.log(data);
        setMessages(data);
        setText("");
      }else{
        alert("Missing fields!")
      }
      
    }
    
    return(
        <Container>
          <h3>Welcome to DevThoughts! A simple chat app for the GraphQL series!</h3>
          <Text user={messages}/>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField onChange={(e)=>{
                setUser(e.target.value)}} value={user} size="small" fullWidth variant="outlined" required label="Enter name" />
            </Grid>
            <Grid item xs={8}>
              <TextField onChange={(e)=>{
                setText(e.target.value)}} value={text} size="small" fullWidth variant="outlined" required label="Enter message here" />
            </Grid>
            <Grid item xs={1}>
              <Button onClick={sendMessage} fullWidth  variant="contained" style={{backgroundColor:"#60a820", color:"white"}}>Send</Button>
            </Grid>
          </Grid>
        </Container>
    )
};

export default Messages;