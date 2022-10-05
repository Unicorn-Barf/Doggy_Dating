import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

export default function MainLoggedOut() {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={6} alignItems="center">
                <h1>Welcome to Bone Buddies! 🦴🐶</h1>
                <p>A place where you can find doggone great friends for your great dog!  Set up playdates, make new furends, and build lifelong friendships for your dog.</p>
                <Button variant="contained" href="/sign-in">Sign In</Button>
                <p>Don't have an account?  <Link to="/sign-up">Sign up here!</Link></p>
            </Grid>
        </Grid>
    );
}