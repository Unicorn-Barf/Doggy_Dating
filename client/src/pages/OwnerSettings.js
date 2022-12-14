import React, { useState } from "react"
import { Container, Grid, Paper, TextField, Button, Select, MenuItem, InputLabel, FormControl, Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from "@apollo/client";
import { PUT_OWNER } from "../utils/mutations";
import { getSavedOwner, saveOwner } from "../utils/localStorage";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import '../pages/styles/pages.css';

export default function OwnerSettings() {

   // FOR FUTURE DEVELOPMENT
   // const sexes = ['Male', 'Female', 'Prefer not to say'];
   // const [firstName, setFirstName] = useState(ownerData.firstName ? ownerData.firstName : "");
   // const [lastName, setLastName] = useState(ownerData.lastName ? ownerData.lastName : "");
   // const [sex, setSex] = useState(ownerData.sex ? ownerData.sex : "");

   const ownerData = getSavedOwner();
   const [putOwner] = useMutation(PUT_OWNER);

   const birthdayDate = new Date(parseInt(ownerData.birthday));
   const [birthday, setBirthday] = useState(ownerData.birthday ? birthdayDate : "");

   const [confirmPassword, setConfirmPassword] = useState("");
   const [passwordMatchAlert, setPasswordMatchAlert] = useState(false);
   const [userFormData, setUserFormData] = useState({
      newPassword: '',
      currentPassword: '',
      birthday: birthdayDate || '12/20/1992',
      firstName: ownerData.firstName || '',
      lastName: ownerData.lastName || '',
      username: ownerData.username || "",
      email: ownerData.email || '',
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
      <div className="main-container">
         <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 1, marginTop: 3 }}>
               <div>
                  <h1>Update Your Info</h1>
                  <p>Review and update your account information here.</p>
               </div>
               <Box
                  component="form"
                  sx={{
                     '& > :not(style)': { width: '100%' },
                     maxWidth: '100%',
                  }}
                  noValidate
                  autoComplete="off"
               >
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
                        Your passwords do not match.
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
                        label="Confirm New Password"
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
                     {/* FOR FUTURE DEVELOPMENT
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
            </FormControl> */}
                     <LocalizationProvider dateAdapter={AdapterDayjs} name="birthday" sx={{ my: 1 }}>
                        <MobileDatePicker
                           id="date"
                           label="Birthday"
                           type="date"
                           value={birthday}
                           renderInput={(params) => <TextField {...params} sx={{ my: 1 }} />}
                           name="birthday"
                           onChange={(birthday) => setBirthday(birthday)}
                        />
                     </LocalizationProvider>
                     <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                     >
                        <Button
                           sx={{ my: 2 }}
                           variant="contained"
                           onClick={handleFormSubmit}
                           style={{ backgroundColor: "var(--pink)" }}
                        >
                           Submit
                        </Button>
                     </Stack>
                  </FormControl>
               </Box>
            </Paper>
         </Container>
      </div >
   )
}