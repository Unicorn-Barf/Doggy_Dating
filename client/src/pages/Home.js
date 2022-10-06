import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_DOGS } from "../utils/queries/dogQueries";
import DogCards from '../components/DogCards';
import MainLoggedOut from '../components/MainLoggedOut';
import Auth from '../utils/auth';
import Grid from '@mui/material/Grid';

export default function Home() {
  //Use query to get all dogs from the database
  const dogData = useQuery(GET_ALL_DOGS);
  const dogArray = dogData.data?.getAllDogs || [];

  return (
    <div className="main-container">
      {Auth.loggedIn()
        ? (
          <Grid container spacing={2} justifyContent="center">
            {dogData.loading ? (
              <h1>Loading...</h1>
            ) : (
              <>

                {/* <h1>Find New Furends!</h1> */}
                {dogArray.map((item, key) => {
                  return (
                    <DogCards
                      key={key}
                      images={item.images}
                      name={item.name}
                      breed={item.breed}
                      sex={item.sex}
                      headline={item.headline}
                      about={item.about}
                      _id={item._id}
                    />
                  );
                })}
              </>
            )}
          </Grid>
        ) :
        <MainLoggedOut />
      }
    </div>
  );
}
