import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';

const DogCards = ({
    images,
    name,
    breed,
    about,
    sex,
    headline,
    isFixed,
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
                    <div>
                        <div style={{ padding: 10, display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                            {name}
                            <StarBorderIcon />
                        </div>
                    </div>
                    <div variant="body" color="text.secondary" style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <div>{breed}</div>
                        <div>{sex}</div>
                        <div>Fixed?: {isFixed}</div>
                    </div>
                    <div variant="body2" color="text.secondary">
                        <div style={{ fontWeight: "bold", marginTop: "10px", textAlign: "center" }}>"{headline}"</div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default DogCards;