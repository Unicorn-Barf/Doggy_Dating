import * as React from "react";
import Grid from '@mui/material/Grid';
import DogCards from '../components/DogCards';
import MainLoggedOut from '../components/MainLoggedOut';
import Auth from '../utils/auth';

export default function Home() {
  return (
    <div className="main-container">
      {Auth.loggedIn()
        ?
        <DogCards />
        :
        <MainLoggedOut />
      }
    </div>
  );
}
