import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_ALL_DOGS } from "../../utils/queries/dogQueries";

// ../utils/queries/dogQueries

export default function DogCards() {
    //use query to get all dogs from the database
    const dogData = useQuery(GET_ALL_DOGS);
    console.log(dogData);

    // let dogArray;
    // if (!dogData.loading) {
    const dogArray = dogData.data?.getAllDogs || [];
    // }
    console.log(dogArray);
    <Grid container spacing={2} justifyContent="center">
        {dogData.loading ? (
            <h1>Loading...</h1>
        ) : (
            <>
                {/* <h1>Find New Furends!</h1> */}
                {dogArray.map((item, key) => {
                    return (

                        <Card sx={{ minWidth: 345, margin: 5 }} key={key}>
                            <CardActionArea
                                href={`/profile/${item._id}`}
                                rel='noopener noreferrer'
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.images[0]}
                                    alt="dog image"
                                />
                                <CardContent>
                                    <Typography style={{ padding: 10 }} gutterBottom variant="h5" component="div">
                                        {item.name}

                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.about}
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        {item.breed}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })}
            </>
        )}
    </Grid>
};