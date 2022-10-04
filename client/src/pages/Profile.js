import React from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useQuery } from "@apollo/client";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Grid, Box } from '@mui/material';
import { GET_DOG_BY_DOG_ID } from '../utils/queries';




// const { useSlotProps } = require("@mui/base");


// const { loading, data } = useQuery(GET_ME);
// console.log(data);
// let userData = data?.me || {};

// const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
//     variables: { breed },
//   });



function DogProfile() {
    const { dogId } = useParams();
    // console.log(dogId);
    // const { loading, data } = useQuery(GET_DOG_BY_ID, { variables: { dogId }
    const dogData = useQuery(GET_DOG_BY_DOG_ID, {
        variables: { dogId }
    });

    const dog = dogData.data?.getDog || {};

    // console.log(data);

    // if loading component () show spinning (premade) if not, load the component (ie return)
    // let dogSize = (dog.weight) {
    //     if ()
    // }

    return (
        <>
            <img src={dog.images} />
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} column={16}>
                <Grid xs={8}>
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
                <Grid xs={8}>
                        <h3>{dog.ownerId}</h3>

                        <button onClick={(event) => {
                            if (event) {
                                // go to chat;
                                alert("go to chat");
                                return;
                            }
                            // if user click on this button
                            // take current user to user on this account
                            // mutation PostConversation($dogIds: [ID]) {
                            //   postConversation(dogIds: $dogIds) {

                        }
                        }
                        >
                            playdate
                        </button>
                    {/* </Item> */}
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