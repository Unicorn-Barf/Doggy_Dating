import React, { useState } from "react"
import { Container, Grid, Paper, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useMutation } from "@apollo/client";
import { PUT_OWNER } from "../utils/mutations";
import { getSavedOwner } from "../utils/localStorage";

const OwnerSettings = () => {

   const sexes = ['Male', 'Female', 'Prefer not to say'];

   const ownerData = getSavedOwner();
   const [putOwner] = useMutation(PUT_OWNER);

   const [username, setUsername] = useState(ownerData.username);
   const [email, setEmail] = useState(ownerData.email);
   // const [currentPassword, setCurrentPassword] = useState("");
   // const [newPassword, setNewPassword] = useState("");
   // const [confirmPassword, setConfirmPassword] = useState("");
   const [firstName, setFirstName] = useState(ownerData.firstName);
   const [lastName, setLastName] = useState(ownerData.lastName);
   const [sex, setSex] = useState(ownerData.sex ? ownerData.sex : "");
   const [birthday, setBirthday] = useState(Date(ownerData.birthday ? ownerData.birthday : ""));
   const [about, setAbout] = useState(ownerData.about ? ownerData.about : "");


   const [profile, setProfile] = useState({
      name: "",
   });

   const handleInputChange = async (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      console.log(name, value);
      if(event.target.name === 'username') {
         setUsername(event.target.value);
      }
      if(event.target.name === 'email') {
         setEmail(event.target.value);
      }
      // if(event.target.name === 'currentPassword') {
      //    setCurrentPassword(event.target.value);
      // }
      // if(event.target.name === 'newPassword') {
      //    setNewPassword(event.target.value);
      // }
      // if(event.target.name === 'confirmPassword') {
      //    setConfirmPassword(event.target.value);
      // }
      if(event.target.name === 'firstName') {
         setFirstName(event.target.value);
      }
      if(event.target.name === 'lastName') {
         setLastName(event.target.value);
      }
      if(event.target.name === 'sex') {
         setSex(event.target.value);
      }
      if(event.target.name === 'birthday') {
         setBirthday(event.target.value);
      }
      if(event.target.name === 'about') {
         setAbout(event.target.value);
      }
   }

   const handleFormSubmit = async (event) => {
      const PutOwnerInput = {};
      //set PutOwnerInput
      if(username !== "") {
         PutOwnerInput.username = username;
      }
      if(email !== "") {
         PutOwnerInput.email = email;
      }
      if(firstName !== "") {
         PutOwnerInput.firstName = firstName;
      }
      if(lastName !== "") {
         PutOwnerInput.lastName = lastName;
      }
      if(sex !== "") {
         PutOwnerInput.sex = sex;
      }
      if(birthday !== "") {
         PutOwnerInput.birthday = birthday;
      }
      if(about !== "") {
         PutOwnerInput.about = about;
      }
      try {
         const { putOwnerData } = await putOwner({
            variables: {
               owner: PutOwnerInput,
            }
         });
         if(putOwnerData) {
            
         }
      } catch(error) {
         console.error(error);
      }
      //send put request
      //if success, update local storage
      
      console.log(ownerData)
   }

   return (
      <>
         <FormControl>
            <TextField
               sx={{ my: 1}}
               type="text"
               name="username"
               fullWidth
               placeholder="Username"
               onChange={handleInputChange}
               variant="outlined"
               value={username}
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="email"
               fullWidth
               placeholder="email"
               onChange={handleInputChange}
               variant="outlined"
               value={email}
            />
            {/* <TextField
               sx={{ my: 1}}
               type="text"
               name="currentPassword"
               fullWidth
               placeholder="currentPassword"
               onChange={handleInputChange}
               variant="outlined"
               value={currentPassword}
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="newPassword"
               fullWidth
               placeholder="newPassword"
               onChange={handleInputChange}
               variant="outlined"
               value={newPassword}
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="confirmPassword"
               fullWidth
               placeholder="confirmPassword"
               onChange={handleInputChange}
               variant="outlined"
               value={confirmPassword}
            /> */}
            <TextField
               sx={{ my: 1}}
               type="text"
               name="firstName"
               fullWidth
               placeholder="firstName"
               onChange={handleInputChange}
               variant="outlined"
               value={firstName}
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="lastName"
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
            <TextField
               sx={{ my: 1}}
               type="text"
               name="birthday"
               fullWidth
               placeholder="birthday"
               onChange={handleInputChange}
               variant="outlined"
               value={birthday}
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="about"
               fullWidth
               placeholder="about"
               onChange={handleInputChange}
               variant="outlined"
               value={about}
            />
            <Button onClick={handleFormSubmit}>
               Submit
            </Button>
         </FormControl>
      </>
   )
}

export default OwnerSettings;