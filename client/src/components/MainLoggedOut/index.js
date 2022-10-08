import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import DogsPlaying from '../../pages/assets/images/dogs_playing_orange_ball.jpg';
import '../../pages/styles/pages.css';

export default function MainLoggedOut() {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={10} alignItems="center">
                <h1>
                    Welcome to<br />
                    Bone Buddies
                </h1>
                {/* <Stack>
                    <img
                        src={Logo}
                        id="logo"
                        style={{ alignSelf: "center" }}
                        alt="Bone Buddies logo"
                    ></img>
                </Stack> */}
                <p>A place where you can find doggone great friends for your great dog!  Set up playdates, make new furends, and build lifelong friendships for your dog.</p>
                <Stack>
                    <img
                        src={DogsPlaying}
                        id="dogsOrangeBall"
                        style={{ alignSelf: "center" }}
                        alt="dogs playing"
                    ></img>
                </Stack>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Link to="/sign-in" style={{ textDecoration: "none" }}><Button variant="contained">Sign In</Button></Link>
                </Stack>
                <p>Don't have an account?  <Link to="/sign-up">Sign up here!</Link></p>
            </Grid>
        </Grid>
    );
}