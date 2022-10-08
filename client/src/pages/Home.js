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
   const maxPages = Math.ceil(dogData.data?.getAllDogs.length / 10) - 1 || 0;

   const [page, setPage] = useState(0);
   const [dogDisplay, setDogDisplay] = useState([]);
   const [initialized, setInitialized] = useState(false);


   const incrementPage = () => {
      if (page < maxPages) {
         setDisplay(page + 1);
         setPage(page + 1);
         return;
      }
      setDisplay(page);
   }

   const decrementPage = () => {
      if (page > 0) {
         setDisplay(page - 1);
         setPage(page - 1);
         return;
      }
      setDisplay(page);
   }

   const setDisplay = (page) => {
      const start = page === 0 ? 0 : page * 10; //0 start 0,10 1 start 10,20
      const end = start + 10;
      // Testing Console logs: save for later!
      // console.log("maxPages: " + maxPages);
      // console.log("Page: " + page + ", Start: " + start + ", End: " + end);
      setDogDisplay(dogArray.slice(start, end));
   }

   const initializePage = () => {
      if (dogDisplay.length === 0 && !dogData.loading) {
         setDisplay(page);
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
                  <Grid
                     container
                     spacing={2}
                     style={{ justifyContent: "center" }}
                  >
                     {dogData.loading ? (
                        <h1>Loading...</h1>
                     ) : (
                        <>
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
                  <Grid item xs={6} style={{ display: "flex", justifyContent: "space-between" }}>
                     <Button
                        onClick={decrementPage}
                        style={{ textDecoration: "none", color: "white", padding: "10px" }}
                     >
                        Previous Page
                     </Button>
                     <p>Page: {page + 1}</p>
                     <Button
                        onClick={incrementPage}
                        style={{ textDecoration: "none", color: "white", padding: "10px" }}
                     >
                        Next Page
                     </Button>
                  </Grid>
               </>
            ) :
            <MainLoggedOut />
         }
      </div>
   );
}
