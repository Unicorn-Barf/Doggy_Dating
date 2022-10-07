import React, { useState } from "react"
import { Container, TextField, Button, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import Stack from "@mui/material/Stack";
import { GET_DOG_BY_ID } from '../utils/queries';
import { PUT_DOG, DELETE_DOG } from "../utils/mutations";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQuery, useMutation } from "@apollo/client";
import AuthService from "../utils/auth";
import { Form, Navigate, useParams } from 'react-router-dom';
import { getDog } from "../slices/dogSlice";
import { useSelector } from "react-redux";
import FormHelperText from '@mui/material/FormHelperText';
import { getSavedDogArr, getCurrentDogIndex, saveDogArr, pushDogToArr, deleteCurrDogFromArr } from "../utils/localStorage";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { Paper } from '@mui/material';
import { current } from "@reduxjs/toolkit";
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { DogImageUploadWidget } from "../components/CloudinaryUploadWidget";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DogSettings = () => {

   const navigate = useNavigate();

   const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
   };

   const ITEM_HEIGHT = 48;
   const ITEM_PADDING_TOP = 8;
   const MenuProps = {
      PaperProps: {
         style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
         },
      },
   };

   const personalities = [
      'Aggressive',
      'Confident',
      'Outgoing',
      'Adaptable',
      'Insecure',
      'Independent',
      'Laid Back',
   ];

   const sexes = ['Male', 'Female'];

   let dogArray = getSavedDogArr();
   let currentDog, birthdayDate, dogId, isFixed;
   if (dogArray.length !== 0) {
      currentDog = dogArray[getCurrentDogIndex()];
      birthdayDate = new Date(parseInt(currentDog.birthday));
      dogId = currentDog._id;
      isFixed = currentDog.isFixed === true ? "true" : "false";
   } else {
      currentDog = {
         name: null,
         breed: null,
         sex: null,
         weight: null,
         isFixed: null,
         personality: null,
         birthday: null,
         headline: null,
         about: null,
      }
   }

   const [putDog] = useMutation(PUT_DOG);
   const [deleteDog] = useMutation(DELETE_DOG);

   const [open, setOpen] = useState(false);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [dogName, setDogName] = useState(currentDog.name ? currentDog.name : "");
   const [dogBreed, setDogBreed] = useState(currentDog.breed ? currentDog.breed : "");
   const [dogSex, setDogSex] = useState(currentDog.sex ? currentDog.sex : "");
   const [dogWeight, setDogWeight] = useState(currentDog.weight ? currentDog.weight : "");
   const [dogIsFixed, setDogIsFixed] = useState(isFixed ? isFixed : "");
   const [dogPersonality, setDogPersonality] = useState(currentDog.personality ? currentDog.personality : []);
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
      if (event.target.name === 'isFixed') {
         setDogIsFixed(event.target.value);
      }
   }

   const handlePersonalityChange = (event) => {
      const {
         target: { value },
      } = event;
      setDogPersonality(
         // On autofill we get a stringified value.
         typeof value === 'string' ? value.split(',') : value,
      );
   };

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
      if (dogIsFixed !== "") {
         if (dogIsFixed === 'true') {
            PutDogInput.isFixed = true;
         } else if (dogIsFixed === 'false') {
            PutDogInput.isFixed = false;
         }
      }
      if (dogPersonality) {
         PutDogInput.personality = dogPersonality;
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

   const handleDeleteSubmit = async (event) => {
      try {
         const deleteDogData = await deleteDog({
            variables: {
               dogId: dogId,
            }
         });
         if (deleteDogData.data.deleteDog) {
            deleteCurrDogFromArr();
            navigate("/home");
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <>
         {dogArray.length === 0
            ? <div><h1>You have no dogs. ☹️</h1></div>
            : <div className="main-container">
               <Container maxWidth="sm">
                  <Paper elevation={3} sx={{ padding: 5, marginTop: 3 }}>
                     <div>
                        <h1>Update {dogName}'s' Info</h1>
                        <p>Review and update {dogName}'s information here.</p>
                     </div>
                     <FormControl>
                        <Box
                           component="form"
                           sx={{
                              '& > :not(style)': { m: 1, width: '100%' },
                              maxWidth: '100%',
                           }}
                           noValidate
                           autoComplete="off"
                        >
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
                              label="Weight"
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

                           <FormControl>
                              <InputLabel className="select-fixed-label">Spayed or Neutered?</InputLabel>
                              <Select
                                 labelId="select-fixed-label"
                                 value={dogIsFixed}
                                 name="isFixed"
                                 label="Fix"
                                 onChange={handleInputChange}
                              >
                                 <MenuItem value={"true"}>Yes</MenuItem>
                                 <MenuItem value={"false"}>No</MenuItem>
                              </Select>
                              <FormHelperText>Is your dog spayed/neutered?</FormHelperText>
                           </FormControl>

                           <FormControl sx={{ width: '100%' }}>
                              <InputLabel id="multiple-checkbox-label">Personality Traits</InputLabel>
                              <Select
                                 labelId="multiple-checkbox-label"
                                 id="multiple-checkbox"
                                 multiple
                                 label="Personality"
                                 value={dogPersonality}
                                 name="personality"
                                 onChange={handlePersonalityChange}
                                 input={<OutlinedInput label="Personality" />}
                                 renderValue={(selected) => selected.join(', ')}
                                 MenuProps={MenuProps}
                              >
                                 {personalities.map((traits) => (
                                    <MenuItem key={traits} value={traits}>
                                       <Checkbox checked={dogPersonality.indexOf(traits) > -1} />
                                       <ListItemText primary={traits} />
                                    </MenuItem>
                                 ))}
                              </Select>
                              <FormHelperText>Please select all that apply.</FormHelperText>
                           </FormControl>

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
                           <Stack
                              direction="row"
                              spacing={2}
                              justifyContent="center"
                           >
                              <Button
                                 variant="contained"
                                 onClick={handleFormSubmit}
                              >
                                 Submit Form
                              </Button>
                              <Button sx={{ my: 2 }}
                                 variant="contained"
                                 color="error"
                                 onClick={handleOpen}
                              >
                                 Delete Dog
                              </Button>

                              <Modal open={open} onClose={handleClose}>
                                 <Box sx={modalStyle}>
                                    <h2>Are you sure you want to delete {dogName}?</h2>
                                    <Stack
                                       direction="row"
                                       spacing={2}
                                       justifyContent="center"
                                    >
                                       <Button
                                          sx={{ my: 2 }}
                                          variant="contained"
                                          color="error"
                                          onClick={handleDeleteSubmit}
                                       >
                                          Delete
                                       </Button>
                                    </Stack>
                                 </Box>
                              </Modal>
                              <DogImageUploadWidget />
                           </Stack>
                        </Box>
                     </FormControl>
                  </Paper>
               </Container>
            </div>}
      </>
   )
}

export default DogSettings;