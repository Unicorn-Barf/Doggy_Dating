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

   const [confirmPassword, setConfirmPassword] = useState("");
   const [passwordMatchAlert, setPasswordMatchAlert] = useState(false);
   const [userFormData, setUserFormData] = useState({
      newPassword: '',
      currentPassword: '',
      birthday: birthdayDate || '12/20/1992',
      firstName: ownerData.firstName || '',
      lastName: ownerData.lastName || '',
      username: ownerData.username || "",
      email:  ownerData.email || '',
      sex: ownerData.sex || '',
   });

   const handleInputChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      setUserFormData({
          ...userFormData,
          [name]: value,
      })
  };


   const handleFormSubmit = async (event) => {
      let PutOwnerInput = {};
      for (let key in userFormData) {
         // console.log(key.length);
         if (key === 'newPassword' || key === 'confirmPassword') {
            continue;
         }
         if (key === 'birthday') {
            const birthday = Date.parse(userFormData[key]).toString();
            PutOwnerInput[key] = birthday;
            continue;
         }
         if (userFormData[key].length > 0) {
            PutOwnerInput[key] = userFormData[key];
         }
      }

      if (userFormData.newPassword !== "" || confirmPassword !== "") {
         if (userFormData.newPassword !== confirmPassword) {
            setPasswordMatchAlert(true);
            return;
         } else {
            PutOwnerInput.newPassword = userFormData.newPassword;
         }
      }
      
      try {
         const putOwnerData = await putOwner({
            variables: {
               owner: PutOwnerInput,
            }
         });
         if (putOwnerData.data) {
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
               value={userFormData.username}
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
               value={userFormData.email}
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
               value={userFormData.currentPassword}
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
               value={userFormData.newPassword}
            />
            <TextField
               sx={{ my: 1 }}
               type="text"
               name="confirmPassword"
               label="Confirm Password"
               fullWidth
               placeholder="confirmPassword"
               onChange={(e) => setConfirmPassword(e.target.value)}
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
               value={userFormData.firstName}
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
               value={userFormData.lastName}
            />
            <FormControl>
               <InputLabel id="select-sex-label">Sex</InputLabel>
               <Select
                  labelId="select-sex-label"
                  label="Sex"
                  name="sex"
                  onChange={handleInputChange}
                  value={userFormData.sex}
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
                  value={userFormData.birthday}
                  renderInput={(params) => <TextField {...params} />}
                  name="birthday"
                  onChange={(birthday) => setUserFormData({ ...userFormData, birthday })}
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