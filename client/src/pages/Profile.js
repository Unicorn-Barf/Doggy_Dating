import React, { useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material';
import { useParams, Redirect } from 'react-router-dom';

import { useMutation, useQuery } from "@apollo/client";

import { GET_CONVERSATIONS_BY_DOG_ID, GET_DOG_BY_DOG_ID } from '../utils/queries';
import { CREATE_CONVO } from '../utils/mutations';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Grid, Box, Button } from '@mui/material';
import { shouldWriteResult } from '@apollo/client/core/QueryInfo';


let myDogId = "633bac1663a38b67c5635360";


// setting up and grabbing dogId to be used for chat feature
function DogProfile() {
    const { dogId } = useParams();
    const [isRedirect, setIsRedirect] = useState(false);
    const dogData = useQuery(GET_DOG_BY_DOG_ID, {
        variables: { dogId }
    });

    const [createConvo] = useMutation(CREATE_CONVO);

    const dog = dogData.data?.getDog || {};

    const convoQuery = useQuery(GET_CONVERSATIONS_BY_DOG_ID, {
        variables: { dogId }
    });

    const initiatePlaydate = async () => {
        let convoId;
        console.log(convoQuery.data.getAllConversationsByDogId);
        let convoArr = convoQuery.data?.getAllConversationsByDogId || [];
        if (convoArr.length > 0) {
            for (let i = 0; i < convoArr.length; i++) {
                if (convoArr[i].dogIds.includes(dogId) && convoArr[i].dogIds.includes(myDogId)) {
                    convoId = convoArr[i]._id;
                    break;
                }
            }
        } else {
            try {
                const { data } = await createConvo({
                    variables: { dogIds: [dogId, myDogId] },
                });
                convoId = data.postConversation._id;

            } catch (error) {
                console.log(error);
            }
        }
        setIsRedirect(true);
    };

    // for whether or not the user can edit dog right on profile
    // const editDogProfile = () => {
    //     if (!dog.dogId === dog.ownerId ? showButton : null ) 
    //     // if ownerId matches the dogId on the page, then button will not show
    //     // if ownerId does not match the dogId on the page, then the button will show
    //     // when clicked on the button, will reroute user to edit dog/owner profile page
    // } else 

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center'}}><img src={dog.images}/></div>
                <Grid container spacing={2} column={16} padding={2} style={{ paddingBottom: 2 }}>
                    <Grid item xs={6}>
                        {dogData.loading
                            ? <h1>loading</h1>
                            : <h1>{dog.name} <IconButton aria-label="fingerprint" color="secondary">
                                <StarBorderIcon />
                            </IconButton></h1>
                        }

                        <h3>{dog.breed}, {dog.weight},{dog.sex} </h3>

                        {/* <h3>{dog.about}</h3> */}

                        {/* let date= moment.unix(dog.birthday);
                    date.format(how i want date to be formatted) */}

                    </Grid>

                    <Grid item xs={6}>
                        <h3>{dog.ownerId}</h3>

                        <Button size="medium" variant="contained" style={{ marginRight: 10 }} onClick={(event) => initiatePlaydate(event)}> playdate </Button>

                        <Button variant="contained" onClick={(event) => (event)}> edit dog </Button>
                    </Grid>
                </Grid>
            </Box>
        </>

    )
}


export default DogProfile;

