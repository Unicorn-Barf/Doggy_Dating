import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_ALL_DOGS } from "../utils/queries/dogQueries";

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
              <Card sx={{ maxWidth: 345 }} key={key}>
                <a href = {`/profile/${item._id}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.images[0]}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.breed}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                </a>
              </Card>
            );
          })}
        </>
      )}
    </>
  );
}
