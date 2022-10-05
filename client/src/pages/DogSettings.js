import React, { useState } from "react"
import { Container, TextField, Button, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { GET_DOG_BY_ID } from '../utils/queries';
import { PUT_DOG } from "../utils/mutations";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQuery, useMutation } from "@apollo/client";
import AuthService from "../utils/auth";
import { Form, useParams } from 'react-router-dom';
import { getDog } from "../slices/dogSlice";
import { useSelector } from "react-redux";
import { getSavedDogArr, getCurrentDogIndex, saveDogArr } from "../utils/localStorage";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";


const DogSettings = () => {

   let dogArray = getSavedDogArr();
   const currentDog = dogArray[getCurrentDogIndex()];
   
   const birthdayDate = new Date(parseInt(currentDog.birthday));

   const sexes = ['Male', 'Female'];

   const dogId = currentDog._id;
   const [putDog] = useMutation(PUT_DOG);

   const [dogName, setDogName] = useState(currentDog.name ? currentDog.name : "");
   const [dogBreed, setDogBreed] = useState(currentDog.breed ? currentDog.breed : "");
   const [dogSex, setDogSex] = useState(currentDog.sex ? currentDog.sex : "");
   const [dogWeight, setDogWeight] = useState(currentDog.weight ? currentDog.weight : "");
   const [dogBirthday, setDogBirthday] = useState(currentDog.birthday ? birthdayDate : "");
   const [dogHeadline, setDogHeadline] = useState(currentDog.headline ? currentDog.headline : "");
   const [dogAbout, setDogAbout] = useState(currentDog.about ? currentDog.about : "");

   const handleInputChange = async (event) => {
      console.log(event.target);
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
      if (event.target.name === 'headline') {
         setDogHeadline(event.target.value);
      }
      if (event.target.name === 'about') {
         setDogAbout(event.target.value);
      }
      console.log(event.target);
   }

   const handleFormSubmit = async (event) => {
      const PutDogInput = {};
      if (dogName !== "") {
         PutDogInput.name = dogName;
      }
      if (dogBreed !== "") {
         PutDogInput.breed = dogBreed;
      }
      if (dogBirthday !== "") {
         PutDogInput.birthday = Date.parse(dogBirthday).toString();
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
         const putDogData = await putDog({
            variables: {
               dogId: dogId,
               dog: PutDogInput,
            }
         });

         //update dog in local storage
         dogArray[getCurrentDogIndex()] = putDogData.data.putDog;
         saveDogArr(dogArray);
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
               <LocalizationProvider dateAdapter={AdapterDayjs} name="birthday">
                  <MobileDatePicker
                     id="date"
                     label="Birthday"
                     type="date"
                     value={dogBirthday}
                     renderInput={(params) => <TextField {...params} />}
                     name="birthday"
                     onChange={(birthday) => setDogBirthday(birthday)}
                  />
               </LocalizationProvider>

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