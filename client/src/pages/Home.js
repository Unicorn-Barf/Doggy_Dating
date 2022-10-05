import * as React from "react";
import DogCards from '../components/DogCards';
import MainLoggedOut from '../components/MainLoggedOut';
import Auth from '../utils/auth';

export default function Home() {
  return (
    <>
      {Auth.loggedIn()
        ?
        <DogCards />
        :
        <MainLoggedOut />
      }
    </>
  );
}
