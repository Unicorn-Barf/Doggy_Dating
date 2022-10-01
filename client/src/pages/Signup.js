import * as React from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { TextField, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import MenuItem from "@mui/material/MenuItem";
import { SIGNUP_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
function Signup() {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [sex, setSex] = React.useState([]);
  const [userFormData, setUserFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    birthday: "",
    sex: "",
  });
  const [signUpUser] = useMutation(SIGNUP_USER);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData, //access the properties which is name and email
      [name]: value, //
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const validates = (values) => {
      const passerrors = {};

      const regexp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{4,12}$/;

      if (!values.password) {
        passerrors.password = "Password is required";
      } else if (!regexp.test(values.password)) {
        passerrors.password =
          "passsword must contain atleast one uppercase,lowercase,number,special character";
      } else if (values.password.length < 4) {
        passerrors.password = "Password must me more than 4 characters";
      } else if (values.password.length > 6) {
        passerrors.password = "Password cannot be more than 6 characters";
      }
      if (!values.confirmpassword) {
        passerrors.confirmpassword = "Password is required";
      } else if (!regexp.test(values.confirmpassword)) {
        passerrors.confirmpassword =
          "passsword must contain atleast one uppercase,lowercase,number,special character";
      } else if (values.confirmpassword.length < 4) {
        passerrors.confirmpassword = "Password must me more than 4 characters";
      } else if (values.confirmpassword.length > 6) {
        passerrors.confirmpassword =
          "Password cannot be more than 6 characters";
      }
      if (values.password !== values.confirmpassword){
        passerrors.confirmpassword = "Passwords must match";
    }
      return passerrors;
    };
    const passerrors = validates(userFormData);
    console.log(passerrors);
    console.log(userFormData);
  };

  const sexes = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <p>Sign up using the form below.</p>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-basic"
            label="Username"
            variant="outlined"
            helperText="Please create a username."
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
          />
          <TextField
            required
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            helperText="Please enter your first name."
            name="firstname"
            onChange={handleInputChange}
            value={userFormData.firstname}
          />
          <TextField
            required
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            helperText="Please enter your last name."
            name="lastname"
            onChange={handleInputChange}
            value={userFormData.lastname}
          />
          <TextField
            required
            id="outlined-basic"
            label="Email"
            variant="outlined"
            helperText="Please enter your email address."
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
          />
          <TextField
            required
            id="outlined-basic"
            label="Create Password"
            variant="outlined"
            helperText="Please create a password."
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
          />
          <TextField
            required
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            helperText="Please type your password again."
            name="confirmpassword"
            onChange={handleInputChange}
            value={userFormData.confirmpassword}
          />
        </Box>
        <p>Enter your dog's info.</p>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <MobileDatePicker
            label="Birthday"
            inputFormat="MM/DD/YYYY"
            value={value}
            renderInput={(params) => <TextField {...params} />}
            helperText="Please select your dog's birthday."
            name="birthday"
          />
          <TextField
            required
            id="outlined-select-sex"
            select
            label="Sex"
            value={sex}
            helperText="Please select your dog's sex."
            name="sex"
          >
            {sexes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            sx={{ my: 2 }}
            fullWidth
            variant="contained"
            type="button"
            onClick={handleFormSubmit}
          >
            Signup
          </Button>
        </Box>
      </div>
    </LocalizationProvider>
  );
}
export default Signup;
