import * as React from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { Container, TextField, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import MenuItem from "@mui/material/MenuItem";
import { SIGNUP_USER } from "../utils/mutations/index";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { storeOwner } from "../slices/ownerSlice";

function Signup() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [sex, setSex] = React.useState([]);
  const [confirmpassword, setConfirmPassword] = React.useState('');
  const [userFormData, setUserFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "2024/06/09",
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
      } else if (values.password.length < 8) {
        passerrors.password = "Password must be more than 8 characters";
      } else if (values.password.length > 30) {
        passerrors.password = "Password cannot be more than 30 characters";
      }
      if (values.password !== confirmpassword) {
        passerrors.confirmpassword = "Passwords must match";
      }
      return passerrors;
    };

    try {
      const passerrors = validates(userFormData);
      if (Object.keys(passerrors).length > 0) {
        throw new Error(
          `validation failed ${passerrors.confirmpassword || ""} and ${
            passerrors.confirmpassword || ""
          }`
        );
      }

      console.log(userFormData);

      userFormData.birthday = userFormData.birthday.toString();
      const { data, error } = await signUpUser({
        variables: {
          owner: {
            ...userFormData,
          },
        },
      });

      Auth.login(data.postOwner.token);
      const loggedInOwner = data.postOwner.owner;
      console.log(loggedInOwner);

      dispatch(
        storeOwner({
          ...loggedInOwner,
        })
      );
    } catch (err) {
      console.log(err);
    }
    // console.log(passerrors);
  };

  // username: String!
  // email: String!
  // password: String!
  // firstName: String!
  // lastName: String!
  // sex: String!
  // birthday: String!
  // const sexes = [
  //   {
  //     value: "Male",
  //     label: "Male",
  //   },
  //   {
  //     value: "Female",
  //     label: "Female",
  //   },
  // ];
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm">
        <h2>Sign Up for Bone Buddies</h2>
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
            name="firstName"
            onChange={handleInputChange}
            value={userFormData.firstName}
          />
          <TextField
            required
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            helperText="Please enter your last name."
            name="lastName"
            onChange={handleInputChange}
            value={userFormData.lastName}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmpassword}
          />
        </Box>
        {/* <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <MobileDatePicker
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            value={userFormData.birthday}
            renderInput={(params) => <TextField {...params} />}
            helperText="Please select your dog's birthday."
            name="birthday"
            onChange={(birthday) =>
              setUserFormData({ ...userFormData, birthday })
            }
          />
          <TextField
            required
            id="outlined-select-sex"
            select
            label="Sex"
            value={userFormData.sex}
            helperText="Please select your dog's sex."
            name="sex"
            onChange={handleInputChange}
          >
            {sexes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> */}
          <Button
            sx={{ my: 2 }}
            fullWidth
            variant="contained"
            type="button"
            onClick={handleFormSubmit}
          >
            Sign Up
          </Button>
        {/* </Box> */}
      </Container>
    </LocalizationProvider>
  );
}

export default Signup;
