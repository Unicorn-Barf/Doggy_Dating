import React, { useState } from "react"
import { Container, Grid, Paper, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";


const Settings = () => {

   const testProfileData = [{name: "Owner"}, {name: "Sparky"},{name: "Spot"}];

   const [userFormData, setUserFormData] = useState({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      sex: "",
      birthday: "",
      about: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
   });

   const [profile, setProfile] = useState({
      name: "",
   });

   const handleInputChange = async (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      console.log(name, value);
      setUserFormData({
         ...userFormData,
         [name]: value,
      });
   }

   const handleFormSubmit = async (event) => {

   }

   const handleProfileChange = async (event) => {
      const { name, value } = event.target;
      console.log(name, value);
      setProfile({
         name: value,
      })
   }

   return (
      <>
         <FormControl fullWidth style={{marginTop: "15px"}}>
            <InputLabel>Profile</InputLabel>
            <Select
               id="profile-selector"
               name="profile"
               value={profile.name}
               onChange={handleProfileChange}
            >
               {
                  testProfileData.map((item, key) => {
                     return <MenuItem key={key} value={item.name}>{item.name}</MenuItem>
                  })
               }
            </Select>
         </FormControl>
         <div>
            <TextField
               sx={{ my: 1}}
               type="text"
               name="username"
               fullWidth
               placeholder="Username"
               onChange={handleInputChange}
               value={userFormData.username}
               variant="outlined"
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="email"
               fullWidth
               placeholder="email"
               onChange={handleInputChange}
               value={userFormData.email}
               variant="outlined"
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="firstName"
               fullWidth
               placeholder="firstName"
               onChange={handleInputChange}
               value={userFormData.firstName}
               variant="outlined"
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="lastName"
               fullWidth
               placeholder="lastName"
               onChange={handleInputChange}
               value={userFormData.lastName}
               variant="outlined"
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="sex"
               fullWidth
               placeholder="sex"
               onChange={handleInputChange}
               value={userFormData.sex}
               variant="outlined"
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="birthday"
               fullWidth
               placeholder="birthday"
               onChange={handleInputChange}
               value={userFormData.birthday}
               variant="outlined"
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="about"
               fullWidth
               placeholder="about"
               onChange={handleInputChange}
               value={userFormData.about}
               variant="outlined"
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="currentPassword"
               fullWidth
               placeholder="currentPassword"
               onChange={handleInputChange}
               value={userFormData.currentPassword}
               variant="outlined"
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="newPassword"
               fullWidth
               placeholder="newPassword"
               onChange={handleInputChange}
               value={userFormData.newPassword}
               variant="outlined"
            />
            <TextField
               sx={{ my: 1}}
               type="text"
               name="confirmPassword"
               fullWidth
               placeholder="confirmPassword"
               onChange={handleInputChange}
               value={userFormData.confirmPassword}
               variant="outlined"
            />
         </div>
      </>
   )
}

export default Settings;