import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const DogCards = ({
    images,
    name,
    breed,
    about,
    sex,
    headline,
    _id }) => {

    return (
        <Card sx={{ minWidth: 345, margin: 5 }}>
            <CardActionArea
                href={`/profile/${_id}`}
                rel='noopener noreferrer'
            >
                <CardMedia
                    component="img"
                    height="200"
                    image={images[0]}
                    alt="dog image"
                />
                <CardContent>
                    <Typography style={{ padding: 10 }} gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {headline}<br />
                        {about}
                    </Typography>
                    <Typography variant="body" color="text.secondary">
                        {breed}<br />{sex}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )};

export default DogCards;