import React, { useState } from "react"
import { Container, TextField, Button, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { GET_DOG_BY_ID } from '../utils/queries';
import { PUT_DOG } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import AuthService from "../utils/auth";
import { Form, useParams } from 'react-router-dom';
import { getDog } from "../slices/dogSlice";
import { useSelector } from "react-redux";


const DogSettings = () => {

   const sexes = ['Male', 'Female'];

   const { dogId } = useParams();
   const [putDog] = useMutation(PUT_DOG);

   const [dogName, setDogName] = useState("");
   const [dogBreed, setDogBreed] = useState("");
   const [dogSex, setDogSex] = useState("");
   const [dogWeight, setDogWeight] = useState("");
   const [dogBirthday, setDogBirthday] = useState("");
   const [dogHeadline, setDogHeadline] = useState("");
   const [dogAbout, setDogAbout] = useState("");

   const handleInputChange = async (event) => {
      if (event.target.name === 'name') {
         setDogName(event.target.value);
      }
      if (event.target.name === 'breed') {
         setDogBreed(event.target.value);
      }
      if (event.target.name === 'sex') {
         setDogSex(event.target.value);
      }
      if (event.target.name === 'weight') {
         setDogWeight(event.target.value);
      }
      if (event.target.name === 'birthday') {
         setDogBirthday(event.target.value);
      }
      if (event.target.name === 'headline') {
         setDogHeadline(event.target.value);
      }
      if (event.target.name === 'about') {
         setDogAbout(event.target.value);
      }
      console.log(event.target);
   }

   const handleFormSubmit = async (event) => {
      //console.log(dog);
      const PutDogInput = {};
      if (dogName !== "") {
         PutDogInput.name = dogName;
      }
      if (dogBreed !== "") {
         PutDogInput.breed = dogBreed;
      }
      if (dogBirthday !== "") {
         PutDogInput.birthday = dogBirthday;
      }
      if (dogSex !== "") {
         PutDogInput.sex = dogSex;
      }
      if (dogWeight !== "") {
         PutDogInput.weight = parseInt(dogWeight);
      }
      if (dogHeadline !== "") {
         PutDogInput.headline = dogHeadline;
      }
      if (dogAbout !== "") {
         PutDogInput.about = dogAbout;
      }
      console.log(PutDogInput);
      try {
         const { putDogData } = await putDog({
            variables: {
               dogId: dogId,
               dog: PutDogInput,
            }
         });
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <>
         <Container>
            <FormControl style={{ marginTop: "15px" }}>
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="name"
                  fullWidth
                  label="Name"
                  onChange={handleInputChange}
                  value={dogName}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="breed"
                  fullWidth
                  label="Breed"
                  onChange={handleInputChange}
                  value={dogBreed}
                  variant="outlined"
               />
               {/* <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="sex"
                  fullWidth
                  label="Sex"
                  onChange={handleInputChange}
                  value={dogSex}
                  variant="outlined"
               /> */}
               <FormControl>
                  <InputLabel id="select-sex-label">Sex</InputLabel>
                  <Select
                     labelId="select-sex-label"
                     label="Sex"
                     name="sex"
                     onChange={handleInputChange}
                     value={dogSex}
                  >
                     {
                        sexes.map((item, key) => {
                           return <MenuItem key={key} value={item}>{item}</MenuItem>
                        })
                     }
                  </Select>
               </FormControl>
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="weight"
                  fullWidth
                  label="weight"
                  onChange={handleInputChange}
                  value={dogWeight}
                  variant="outlined"
               />

               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="birthday"
                  fullWidth
                  label="Birthday"
                  onChange={handleInputChange}
                  value={dogBirthday}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="headline"
                  fullWidth
                  label="Headline"
                  onChange={handleInputChange}
                  value={dogHeadline}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="about"
                  fullWidth
                  label="About"
                  onChange={handleInputChange}
                  value={dogAbout}
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