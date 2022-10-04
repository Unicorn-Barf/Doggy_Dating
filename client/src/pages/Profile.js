import React, { useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material';
import { useParams, Redirect } from 'react-router-dom';

import { useMutation, useQuery } from "@apollo/client";

import { GET_CONVERSATIONS_BY_DOG_ID, GET_DOG_BY_DOG_ID } from '../utils/queries';
import { CREATE_CONVO } from '../utils/mutations';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Grid, Box } from '@mui/material';


let myDogId = "633bac1663a38b67c5635360";

// const { useSlotProps } = require("@mui/base");


// const { loading, data } = useQuery(GET_ME);
// console.log(data);
// let userData = data?.me || {};

// const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
//     variables: { breed },
//   });



function DogProfile() {
    const { dogId } = useParams();
    const [isRedirect, setIsRedirect] = useState(false);
    // console.log(dogId);
    // const { loading, data } = useQuery(GET_DOG_BY_ID, { variables: { dogId }
    const dogData = useQuery(GET_DOG_BY_DOG_ID, {
        variables: { dogId }
    });

    const [createConvo] = useMutation(CREATE_CONVO);

    const dog = dogData.data?.getDog || {};

    // console.log(data);

    // if loading component () show spinning (premade) if not, load the component (ie return)
    // let dogSize = (dog.weight) {
    //     if ()
    // }
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

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <img src={dog.images} />
                <Grid container spacing={2} column={16} padding={2}>
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

                        <button onClick={(event) => initiatePlaydate(event)
                        }
                        >
                            playdate
                        </button>
                    </Grid>
                </Grid>
            </Box>
        </>

    )
}



export default DogProfile;





            // {/* {dogData.loading
            //     ? <h1>loading</h1>
            //     : <h1>{dog.name}, {dog.birthday}</h1>
            // } */}

            // {/* add a mutation. favorite is a form. if true, color star, if false line*/}

            // {/* wrap this in container */}
            // {/* {dog.data.loading
            //     ? <h3>{dog.breed}
            //         <>
            //             {dog.weight ? =< 22
            //                 : <p>small</p>
            //                     ? > 23 && =< 55
            //             :<p>medium</p>
            //             ? < 55
            //             :<p>large</p>
            // },
            //         </>
            //         {dog.sex} </h3> */}


                        // if user click on this button
                            // take current user to user on this account
                            // mutation PostConversation($dogIds: [ID]) {
                            //   postConversation(dogIds: $dogIds) {