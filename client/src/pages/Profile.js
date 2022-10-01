import React from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useQuery } from "@apollo/client";

import { GET_DOG_BY_ID } from '../utils/queries';

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

    return (
        <>
            {dogData.loading
                ? <h1>loading</h1>
                : <h1>{dog.name}</h1>
            }



            <button onClick={() => {

            }}
            >
                playdate
            </button>
        </>
    )
}



export default DogProfile;
