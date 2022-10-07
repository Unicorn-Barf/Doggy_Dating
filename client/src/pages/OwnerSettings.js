import React, { useState } from "react"
import { Container, Grid, Paper, TextField, Button, Select, MenuItem, InputLabel, FormControl, Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from "@apollo/client";
import { PUT_OWNER } from "../utils/mutations";
import { getSavedOwner, saveOwner } from "../utils/localStorage";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const OwnerSettings = () => {

   const sexes = ['Male', 'Female', 'Prefer not to say'];

   const ownerData = getSavedOwner();
   const [putOwner] = useMutation(PUT_OWNER);

   const birthdayDate = new Date(parseInt(ownerData.birthday));

   const [username, setUsername] = useState(ownerData.username ? ownerData.username : "");
   const [email, setEmail] = useState(ownerData.email ? ownerData.email : "");
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [firstName, setFirstName] = useState(ownerData.firstName ? ownerData.firstName : "");
   const [lastName, setLastName] = useState(ownerData.lastName ? ownerData.lastName : "");
   const [sex, setSex] = useState(ownerData.sex ? ownerData.sex : "");
   const [birthday, setBirthday] = useState(ownerData.birthday ? birthdayDate : "");

   const [passwordMatchAlert, setPasswordMatchAlert] = useState(false);

   const handleInputChange = async (event) => {
      const { name, value } = event.target;
      console.log(name, value);
      if (event.target.name === 'username') {
         setUsername(event.target.value);
      }
      if (event.target.name === 'email') {
         setEmail(event.target.value);
      }

      if (event.target.name === 'currentPassword') {
         setCurrentPassword(event.target.value);
      }
      if (event.target.name === 'newPassword') {
         setNewPassword(event.target.value);
      }
      if (event.target.name === 'confirmPassword') {
         setConfirmPassword(event.target.value);
      }

      if (event.target.name === 'firstName') {
         setFirstName(event.target.value);
      }
      if (event.target.name === 'lastName') {
         setLastName(event.target.value);
      }
      if (event.target.name === 'sex') {
         setSex(event.target.value);
      }
      if (event.target.name === 'birthday') {
         setBirthday(event.target.value);
      }

   }

   const handleFormSubmit = async (event) => {
      const PutOwnerInput = {};
      //set PutOwnerInput
      if (username !== "") {
         PutOwnerInput.username = username;
      }
      if (email !== "") {
         PutOwnerInput.email = email;
      }
      if (firstName !== "") {
         PutOwnerInput.firstName = firstName;
      }
      if (lastName !== "") {
         PutOwnerInput.lastName = lastName;
      }
      if (sex !== "") {
         PutOwnerInput.sex = sex;
      }
      if (birthday !== "") {
         PutOwnerInput.birthday = Date.parse(birthday).toString();
      }
      if (currentPassword !== "") {
         PutOwnerInput.currentPassword = currentPassword;
      }
      if (newPassword !== "" || confirmPassword !== "") {
         if (newPassword !== confirmPassword) {
            setPasswordMatchAlert(true);
            return;
         } else {
            PutOwnerInput.newPassword = newPassword;
         }
      }
      console.log(PutOwnerInput)
      try {
         const putOwnerData = await putOwner({
            variables: {
               owner: PutOwnerInput,
            }
         });
         if (putOwnerData) {
            saveOwner(putOwnerData.data.putOwner);
         }
      } catch (error) {
         console.error(error);
      }
      //send put request
      //if success, update local storage
   }

   return (
      <>
         <Collapse in={passwordMatchAlert}>
            <Alert
               severity="error"
               action={
                  <IconButton
                     aria-label="close"
                     color="inherit"
                     size="small"
                     onClick={() => {
                        setPasswordMatchAlert(false);
                     }}
                  >
                     <CloseIcon fontSize="inherit" />
                  </IconButton>
               }
               sx={{ mb: 2 }}
            >
               Your passwords do not match
            </Alert>
         </Collapse>
         <FormControl>
            <TextField
               sx={{ my: 1 }}
               type="text"
               name="username"
               label="Username"
               fullWidth
               placeholder="Username"
               onChange={handleInputChange}
               variant="outlined"
               value={username}
            />
            <TextField
               sx={{ my: 1 }}
               type="text"
               name="email"
               label="Email"
               fullWidth
               placeholder="email"
               onChange={handleInputChange}
               variant="outlined"
               value={email}
            />
            <TextField
               sx={{ my: 1 }}
               type="text"
               name="currentPassword"
               label="Current Password"
               fullWidth
               placeholder="currentPassword"
               onChange={handleInputChange}
               variant="outlined"
               value={currentPassword}
            />
            <TextField
               sx={{ my: 1 }}
               type="text"
               name="newPassword"
               label="New Password"
               fullWidth
               placeholder="newPassword"
               onChange={handleInputChange}
               variant="outlined"
               value={newPassword}
            />
            <TextField
               sx={{ my: 1 }}
               type="text"
               name="confirmPassword"
               label="Confirm Password"
               fullWidth
               placeholder="confirmPassword"
               onChange={handleInputChange}
               variant="outlined"
               value={confirmPassword}
            />
            <TextField
               sx={{ my: 1 }}
               type="text"
               name="firstName"
               label="First Name"
               fullWidth
               placeholder="firstName"
               onChange={handleInputChange}
               variant="outlined"
               value={firstName}
            />
            <TextField
               sx={{ my: 1 }}
               type="text"
               name="lastName"
               label="Last Name"
               fullWidth
               placeholder="lastName"
               onChange={handleInputChange}
               variant="outlined"
               value={lastName}
            />
            <FormControl>
               <InputLabel id="select-sex-label">Sex</InputLabel>
               <Select
                  labelId="select-sex-label"
                  label="Sex"
                  name="sex"
                  onChange={handleInputChange}
                  value={sex}
               >
                  {
                     sexes.map((item, key) => {
                        return <MenuItem key={key} value={item}>{item}</MenuItem>
                     })
                  }
               </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs} name="birthday">
               <MobileDatePicker
                  id="date"
                  label="Birthday"
                  type="date"
                  value={birthday}
                  renderInput={(params) => <TextField {...params} />}
                  name="birthday"
                  onChange={(birthday) => setBirthday(birthday)}
               />
            </LocalizationProvider>
            <Button variant="contained" onClick={handleFormSubmit}>
               Submit
            </Button>
         </FormControl>
      </>
   )
}

export default OwnerSettings;