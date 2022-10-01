import React from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useQuery } from "@apollo/client";

import { GET_DOG_BY_ID } from '../utils/queries';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton } from '@mui/material';

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
    const dogData = useQuery(GET_DOG_BY_ID, {
        variables: { dogId }
    });

    const dog = dogData.data?.getDog || {};

    // console.log(data);

    // if loading component () show spinning (premade) if not, load the component (ie return)

    return (
        <>
            <img src={dog.images} />
            {/* put in a container */}
            {dogData.loading
                ? <h1>loading</h1>
                : <h1>{dog.name} <IconButton aria-label="fingerprint" color="secondary">
                    <StarBorderIcon />
                </IconButton></h1>
            }

            {/* {dogData.loading
                ? <h1>loading</h1>
                : <h1>{dog.name}, {dog.birthday}</h1>
            } */}
            {/* add a mutation. favorite is a form. if true, color star, if false line*/}

            {/* wrap this in container */}
            <h3>{dog.breed}, {dog.weight}, {dog.sex} </h3>

            {/* <h3>{dog.about}</h3> */}

            {/* let date= moment.unix(dog.birthday);
date.format(how i want date to be formatted) */}


            <button onClick={() => {
                // if user click on this button
                // take current user to user on this account
                // mutation PostConversation($dogIds: [ID]) {
                //   postConversation(dogIds: $dogIds) {

            }
            }
            >
            playdate
        </button>
        </>
    )
}



export default DogProfile;
