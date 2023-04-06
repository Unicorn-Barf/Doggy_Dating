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
import { useSelector, useDispatch } from 'react-redux';
import { storeCurrentDogIndex, getDogIndex } from '../slices/dogSlice';

export default function DogProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { dogId } = useParams();
    const dogIndex = useSelector(getDogIndex);
    const dogArr = getSavedDogArr();
    const myDogId = dogArr[getCurrentDogIndex()]._id;
    let payload;
    for (let i=0; i<dogArr.length; i++) {
        if (dogArr[i]._id === dogId) {
            payload = myDogId;
            break;
        }
        else payload = dogId;
    };
    dispatch(storeCurrentDogIndex(getCurrentDogIndex()));
    const dogData = useQuery(GET_DOG_BY_DOG_ID, {
        variables: { dogId: payload }
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
                let check = convoArr[i].dogIds.every(({ _id }) => {
                    return _id === dogId || _id === myDogId;
                })
                if (check) {
                    convoId = convoArr[i]._id;
                    navigate('/chat', {
                        state: {
                            convoId,
                            toggle: true,
                        }
                    });
                    return;
                }
            }
        }

        try {
            const { data } = await createConvo({
                variables: { dogIds: [dogId, myDogId] },
            });
            convoId = data.postConversation._id;

        } catch (error) {
            console.log(error);
        }
        // Navigate also sending the convoId to next component.
        navigate('/chat', {
            state: {
                convoId,
                toggle: true,
            }
        });
    };

    // FOR FUTURE DEVELOPMENT
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
                <Grid item xs={12}>
                    <Container maxWidth="sm">
                        <Paper elevation={3} sx={{ padding: 1, marginTop: 3 }}>
                            <Box sx={{ flexGrow: 1, justifyContent: "center", margin: 1 }}>
                                {dogData.loading
                                    ?
                                    <h1>Loading...</h1>
                                    :
                                    <div style={{ my: 1 }}>
                                        <Stack
                                            justifyContent="center"
                                        >
                                            <img
                                                src={dog.images[dog.images.length - 1]}
                                                style={{ maxWidth: "100%", my: 1, alignSelf: "center", objectFit: "cover" }}
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

                                        {/* FOR FUTURE DEVELOPMENT
                                    let date= moment.unix(dog.birthday);
                                        date.format(how i want date to be formatted) */}

                                        <div style={{ display: "flex", justifyContent: "center", padding: 3, my: 1 }}>
                                            <h3>{dog.ownerId.username}</h3>
                                        </div>
                                    </div>
                                }
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    {dogId === myDogId ?
                                    ''
                                    :
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        style={{ margin: 5 }}
                                        onClick={(event) => initiatePlaydate(event)}
                                    >
                                        Playdate
                                    </Button>
                                }

                                    {/* FOR FUTURE DEVELOPMENT
                                <Button
                                    size="medium"
                                    variant="contained"
                                    style={{ margin: 5 }}
                                    onClick={(event) => (event)}
                                >
                                    Edit Dog
                                </Button> */}
                                </Stack>
                            </Box>
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}