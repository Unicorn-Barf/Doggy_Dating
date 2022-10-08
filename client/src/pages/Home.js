import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_DOGS } from "../utils/queries/dogQueries";
import DogCards from '../components/DogCards';
import MainLoggedOut from '../components/MainLoggedOut';
import Auth from '../utils/auth';
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";
import { isLoggedIn } from "../slices/ownerSlice";
import { Button } from "@mui/material";

// Auth.loggedIn()

export default function Home() {
   // const [loggedIn, setLoggedIn] = React.useState(Auth.loggedIn());
   const loggedIn = useSelector(isLoggedIn);

   //Use query to get all dogs from the database
   const dogData = useQuery(GET_ALL_DOGS);
   const dogArray = dogData.data?.getAllDogs || [];

   const [page, setPage] = useState(0);
   const [dogDisplay, setDogDisplay] = useState([]);
   const [maxPages, setMaxPages] = useState(0);
   const [initialized, setInitialized] = useState(false);


   const incrementPage = () => {
      if (page < maxPages) {
         setPage(page + 1);
      }
      setDisplay();
   }

   const decrementPage = () => {
      if (page > 0) {
         setPage(page - 1);
      }
      setDisplay();
   }

   const setDisplay = () => {
      const start = page === 0 ? 0 : page * 10; //0 start 0,10 1 start 10,20
      const end = start + 10;
      console.log("maxPages: " + maxPages);
      console.log("Page: " + page + ", Start: " + start + ", End: " + end);
      setDogDisplay(dogArray.slice(start, end));
   }

   const initializePage = () => {
      if (dogDisplay.length === 0 && !dogData.loading) {
         console.log("initializing");
         setMaxPages(Math.ceil(dogData.data.getAllDogs.length / 10))
         decrementPage();
         setInitialized(true);
      }
   }

   useEffect(() => {
      if (!initialized) {
         initializePage();
      }
   });

   return (
      <div className="main-container">
         {loggedIn
            ? (
               <>
                  <div>
                     <h1>Find New Friends</h1>
                     <p>Tap/click a card to learn more about each new, potential friend.</p>
                  </div>
                  <Grid container spacing={2} justifyContent="center">
                     {dogData.loading ? (
                        <h1>Loading...</h1>
                     ) : (
                        <>

                           {/* <h1>Find New Furends!</h1> */}
                           {dogDisplay.map((item, key) => {
                              return (
                                 <DogCards
                                    key={key}
                                    images={item.images}
                                    name={item.name}
                                    breed={item.breed}
                                    sex={item.sex}
                                    headline={item.headline}
                                    about={item.about}
                                    isFixed={item.isFixed === true ? "Yes" : "No"}
                                    _id={item._id}
                                 />
                              );
                           })}
                        </>
                     )}
                  </Grid>
                  <Button onClick={decrementPage}>Decrement</Button><p>Page: {page}</p><Button onClick={incrementPage}>Increment</Button>
               </>
            ) :
            <MainLoggedOut />
         }
      </div>
   );
}
