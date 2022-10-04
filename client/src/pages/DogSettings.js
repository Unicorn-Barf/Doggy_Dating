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

   const dog = useSelector(getDog);

   const [ putDog ] = useMutation(PUT_DOG);

   const [dogFormData, setdogFormData] = useState({});

   const handleInputChange = async (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      setdogFormData({
         ...dogFormData,
         [name]: value,
      });
   }

   const handleFormSubmit = async (event) => {
      console.log(dog);
      console.log(dogFormData);
      // try {
      //    const { putDogData } = await putDog({
      //       variables: {
      //          dogId: dogId,
      //          dog: dogFormData,
      //       }
      //    });
      // } catch (error) {
      //    console.error(error);
      // }
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