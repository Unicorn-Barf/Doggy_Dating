import React, { useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { useMutation, useQuery } from "@apollo/client";

import { GET_CONVERSATIONS_BY_DOG_ID, GET_DOG_BY_DOG_ID } from '../utils/queries';
import { CREATE_CONVO } from '../utils/mutations';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Grid, Box, Button, Paper } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { shouldWriteResult } from '@apollo/client/core/QueryInfo';
import { getSavedDogArr, getCurrentDogIndex } from '../utils/localStorage';

let myDogId = "633bac1663a38b67c5635360";


// setting up and grabbing dogId to be used for chat feature
export default function DogProfile() {
    const navigate = useNavigate();
    const { dogId } = useParams();
    const myDogId = getSavedDogArr()[getCurrentDogIndex()]._id;
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
        // setIsRedirect(true);
        // Navigate also sending the convoId to next component.
        navigate('/chat', {
            state: {
                convoId,
                toggle: true,
            }
        });
    };

    // for whether or not the user can edit dog right on profile
    // const editDogProfile = () => {
    //     if (!dog.dogId === dog.ownerId ? showButton : null ) 
    //     // if ownerId matches the dogId on the page, then button will not show
    //     // if ownerId does not match the dogId on the page, then the button will show
    //     // when clicked on the button, will reroute user to edit dog/owner profile page
    // } else 

    return (
        <div className="main-container">
            <Grid container spacing={2}>
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{ padding: 1, marginTop: 3 }}>
                        {/* <Grid item> */}
                        <Box sx={{ flexGrow: 1, justifyContent: "center", margin: 3 }}>
                            {/* <Grid container spacing={2} column={16} padding={2} style={{ paddingBottom: 2 }}>
                            <Grid item xs={6}> */}
                            {dogData.loading
                                ?
                                <h1>Loading...</h1>
                                :
                                <div style={{ my: 1 }}>
                                    {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
                                    {/* <img src={dog.images} style={{ maxWidth: "500px", my: 1 }} /> */}
                                    {/* </div> */}
                                    <Stack
                                        justifyContent="center"
                                    >
                                        <img
                                            src={dog.images}
                                            style={{ maxWidth: "500px", my: 1, alignSelf: "center" }}
                                            alt="dog profile pic"
                                        />
                                    </Stack>
                                    <div style={{ padding: 10, display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold" }}>
                                        <h1>{dog.name}</h1>
                                        <StarBorderIcon />
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "space-around", padding: 3, my: 1 }}>
                                        <div>{dog.breed}</div> | <div>{dog.weight} lbs.</div> | <div>{dog.sex} </div>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "left", padding: 3, my: 1 }}>
                                        <p style={{ textAlign: "left" }}>{dog.about}</p>
                                    </div>

                                    {/* let date= moment.unix(dog.birthday);
                                        date.format(how i want date to be formatted) */}

                                    {/* </Grid> */}

                                    {/* <Grid item xs={6}> */}
                                    <div style={{ display: "flex", justifyContent: "center", padding: 3, my: 1 }}>
                                        <h3>{dog.ownerId}</h3>
                                    </div>
                                </div>
                            }
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button
                                    size="medium"
                                    variant="contained"
                                    style={{ margin: 5 }}
                                    onClick={(event) => initiatePlaydate(event)}
                                >
                                    Playdate
                                </Button>

                                <Button
                                    size="medium"
                                    variant="contained"
                                    style={{ margin: 5 }}
                                    variant="contained"
                                    onClick={(event) => (event)}
                                >
                                    Edit Dog
                                </Button>
                            </Stack>
                            {/* </Grid>
                        </Grid> */}
                            {/* </div> */}
                        </Box>
                        {/* </Grid> */}
                    </Paper>
                </Container>
            </Grid>
        </div>
    )
}


// export default DogProfile;

