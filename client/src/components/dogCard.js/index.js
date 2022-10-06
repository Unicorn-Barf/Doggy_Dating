import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container,Box } from "@mui/material";

const DogCard = ({ images, name, breed, sex, headline }) => {
  return (
    // <Container style={{ width: '100%' }}>
    //   <Box sx={{ display: "flex" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={images[0]}
              alt="dog images"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {breed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {sex}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {headline}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    //   </Box>
    // </Container>
  );
};
export default DogCard;
