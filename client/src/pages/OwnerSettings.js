import React, { useState } from "react"
import { Container, Grid, Paper, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { getOwnerData } from "../slices/ownerSlice";
import { useSelector } from "react-redux";
import AuthService from "../utils/auth";

const OwnerSettings = () => {

   const ownerData = AuthService.getProfile();
   const testProfileData = [{name: "Owner"}, {name: "Sparky"},{name: "Spot"}];

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [sex, setSex] = useState("");
   const [birthday, setBirthday] = useState("");
   const [about, setAbout] = useState("");


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
      if(event.target.name === 'currentPassword') {
         setCurrentPassword(event.target.value);
      }
      if(event.target.name === 'newPassword') {
         setNewPassword(event.target.value);
      }
      if(event.target.name === 'confirmPassword') {
         setConfirmPassword(event.target.value);
      }
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
            <TextField
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
            />
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
            <TextField
               sx={{ my: 1}}
               type="text"
               name="sex"
               fullWidth
               placeholder="sex"
               onChange={handleInputChange}
               variant="outlined"
               value={sex}
            />
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