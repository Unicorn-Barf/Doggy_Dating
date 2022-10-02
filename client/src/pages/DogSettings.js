import React, { useState } from "react"
import { Container, Grid, Paper, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { GET_ALL_DOGS_BY_OWNER_ID } from '../utils/queries';
import { useQuery } from "@apollo/client";
import AuthService from "../utils/auth";


const DogSettings = () => {

   const Profile = AuthService.getProfile();

   const dogsQuery = useQuery(GET_ALL_DOGS_BY_OWNER_ID,
   {
      variables: {
         ownerId: Profile.data._id,
      }
   });

   const [dogFormData, setdogFormData] = useState({
      name: "",
      breed: "",
      sex: "",
      birthday: "",
      headline: "",
      about: "",
   });

   const [selectedDog, setSelectedDog] = useState("");

   const handleInputChange = async (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      setdogFormData({
         ...dogFormData,
         [name]: value,
      });
   }

   const handleFormSubmit = async (event) => {
      console.log(dogFormData);
   }

   const handleProfileChange = async (event) => {
      const { name, value } = event.target;
      console.log(event.target.value);
      setSelectedDog(value);
   }

   return (
      <>
         <Container>
            <FormControl style={{marginTop: "15px"}}>
            <InputLabel id="dog-selector-label">Dog</InputLabel>
               <Select
                  id="dog-selector"
                  labelId="dog-selector-label"
                  label="Dog"
                  name="dog"
                  value={selectedDog}
                  onChange={handleProfileChange}
               >
                  {
                     dogsQuery.loading ? <p>loading</p> : dogsQuery.data.getAllDogsByOwner.map((item, key) => {
                        return <MenuItem key={key} value={item.name}>{item.name}</MenuItem>
                     })
                  }
               </Select>
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="name"
                  fullWidth
                  placeholder="Name"
                  onChange={handleInputChange}
                  value={dogFormData.name}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="breed"
                  fullWidth
                  placeholder="Breed"
                  onChange={handleInputChange}
                  value={dogFormData.breed}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="sedx"
                  fullWidth
                  placeholder="Sex"
                  onChange={handleInputChange}
                  value={dogFormData.sex}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="birthday"
                  fullWidth
                  placeholder="Birthday"
                  onChange={handleInputChange}
                  value={dogFormData.birthday}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="headline"
                  fullWidth
                  placeholder="Headline"
                  onChange={handleInputChange}
                  value={dogFormData.headline}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="about"
                  fullWidth
                  placeholder="About"
                  onChange={handleInputChange}
                  value={dogFormData.about}
                  variant="outlined"
               />
               <Button onClick={handleFormSubmit}>
                  Submit
               </Button>
            </FormControl>
         </Container>
      </>
   )
}

export default DogSettings;