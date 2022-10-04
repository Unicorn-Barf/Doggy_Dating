import React, { useState } from "react"
import { Container, TextField, Button, FormControl } from "@mui/material";
import { GET_DOG_BY_ID } from '../utils/queries';
import { PUT_DOG } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import AuthService from "../utils/auth";
import { useParams } from 'react-router-dom';
import { getDog } from "../slices/dogSlice";
import { useSelector } from "react-redux";


const DogSettings = () => {

   const { dogId}  = useParams();

   const [ putDog ] = useMutation(PUT_DOG);

   const [dogFormData, setdogFormData] = useState({});

   const [dogName, setDogName] = useState("");
   const [dogBreed, setDogBreed] = useState("");
   const [dogSex, setDogSex] = useState("");
   const [dogWeight, setDogWeight] = useState("");
   const [dogBirthday, setDogBirthday] = useState("");
   const [dogHeadline, setDogHeadline] = useState("");
   const [dogAbout, setDogAbout] = useState("");


   const handleInputChange = async (event) => {
      if(event.target.name === 'name') {
         setDogName(event.target.value);
      }
      if(event.target.name === 'breed') {
         setDogBreed(event.target.value);
      }
      if(event.target.name === 'sex') {
         setDogSex(event.target.value);
      }
      if(event.target.name === 'birthday') {
         setDogBirthday(event.target.value);
      }
      if(event.target.name === 'headline') {
         setDogHeadline(event.target.value);
      }
      if(event.target.name === 'about') {
         setDogAbout(event.target.value);
      }
      console.log(event.target);
   }

   const handleFormSubmit = async (event) => {
      //console.log(dog);
      const PutDogInput = {};
      if(dogName !== "") {
         PutDogInput.name = dogName;
      }
      if(dogBreed !== "") {
         PutDogInput.breed = dogBreed;
      }
      if(dogBirthday !== "") {
         PutDogInput.birthday = dogBirthday;
      }
      if(dogSex !== "") {
         PutDogInput.sex = dogSex;
      }
      if(dogWeight !== "") {
         PutDogInput.weight = parseInt(dogWeight);
      }
      if(dogHeadline !== "") {
         PutDogInput.headline = dogHeadline;
      }
      if(dogAbout !== "") {
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
                  placeholder="Name"
                  onChange={handleInputChange}
                  value={dogFormData.name === null ? "" : dogFormData.name}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="breed"
                  fullWidth
                  placeholder="Breed"
                  onChange={handleInputChange}
                  value={dogFormData.breed === null ? "" : dogFormData.breed}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="sex"
                  fullWidth
                  placeholder="Sex"
                  onChange={handleInputChange}
                  value={dogFormData.sex === null ? "" : dogFormData.sex}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="birthday"
                  fullWidth
                  placeholder="Birthday"
                  onChange={handleInputChange}
                  value={dogFormData.birthday === null ? "" : dogFormData.birthday}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="headline"
                  fullWidth
                  placeholder="Headline"
                  onChange={handleInputChange}
                  value={dogFormData.headline === null ? "" : dogFormData.headline}
                  variant="outlined"
               />
               <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="about"
                  fullWidth
                  placeholder="About"
                  onChange={handleInputChange}
                  value={dogFormData.about === null ? "" : dogFormData.about}
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