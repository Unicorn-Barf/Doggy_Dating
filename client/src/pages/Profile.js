import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
const { useSlotProps } = require("@mui/base");


// const DogProfile = (props) => {
// console.log(props.dogname);

// return <h1> {props.dogname}</h1>;
// }

function DogProfile (props) {
    console.log(props.dogname);
    return (
        <>
        <h1> {props.dogname}</h1>

        <button onClick={() => {
 
        }}
        >
            playdate
        </button>
        </>
    )
}



export default DogProfile;