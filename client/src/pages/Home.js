import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_DOGS } from "../utils/queries/dogQueries";
import DogCard from "../components/dogCard.js";
import { Grid } from  "@mui/material";
export default function Home() {
  //use query to get all dogs from the database
  const dogData = useQuery(GET_ALL_DOGS);
  console.log(dogData);

  // let dogArray;
  // if (!dogData.loading) {
  const dogArray = dogData.data?.getAllDogs || [];
  // }
  console.log(dogArray);

  return (
    <>
      {dogData.loading ? (
        <h1>loading</h1>
      ) : (
        <>
          {dogArray.map((item, key) => {
            return (
              <a href={`/profile/${item._id}`}>
                <DogCard
                  key={key}
                  images={item.images}
                  name={item.name}
                  breed={item.breed}
                  sex={item.sex}
                  headline={item.headline}
                />
              </a>
            );
          })}
        </>
      )}
    </>
  );
}
