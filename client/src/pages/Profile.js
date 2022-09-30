import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useQuery } from "@apollo/client";

import { GET_DOG_BY_ID } from '../utils/queries';

const { useSlotProps } = require("@mui/base");


// const DogProfile = (props) => {
// console.log(props.dogname);

// return <h1> {props.dogname}</h1>;
// }

// const { loading, data } = useQuery(GET_ME);
// console.log(data);
// let userData = data?.me || {};

// const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
//     variables: { breed },
//   });

function DogProfile () {
    const { dogId } = useParams();
    console.log(dogId);
    const { data } = useQuery(GET_DOG_BY_ID, { variables: { dogId }
    });
    console.log(data);

    const dog = { ...data.getDog };

    return (
        <>
        <h1> {dog.name}</h1>

        <button onClick={() => {
 
        }}
        >
            playdate
        </button>
        </>
    )
}



export default DogProfile;
