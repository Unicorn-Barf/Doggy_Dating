import * as React from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { Container, TextField, Button, Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { SIGNUP_USER } from "../utils/mutations/index";
import { useMutation } from "@apollo/client";
import { useState,useEffect } from "react";
import Auth from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { storeOwner, toggleLoggedIn } from "../slices/ownerSlice";
import { saveOwner } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [sex, setSex] = React.useState([]);
  const [confirmpassword, setConfirmPassword] = React.useState('');
  const [ formErrors, setFormErrors ] = React.useState({
    username: false,
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [ errorMessages, setErrorMessages ] = React.useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isSubmit, setIsSubmit] = React.useState(false);
  const [userFormData, setUserFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "06/09/2000",
  });

  const [signUpUser] = useMutation(SIGNUP_USER);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData, //access the properties which is name and email
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
    console.log(userFormData);
  };

  const checkPassword = (password, confirmpassword) => {
    const passwordErrors = {
      confirmPassword: false,
      password: false,
      passwordMessage: false,
      confirmPasswordMessage: false,
    };
    const regexpPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{4,12}$/;
    if (!password) {
      passwordErrors.passwordMessage = "Password is required";
      passwordErrors.password = true;
    } else if (!regexpPassword.test(password)) {
      passwordErrors.passwordMessage =
        "passsword must contain atleast one uppercase,lowercase,number,special character";
        passwordErrors.password = true;
    } else if (password.length < 8) {
      passwordErrors.passwordMessage = "Password must be more than 8 characters";
      passwordErrors.password = true;
    } else if (password.length > 30) {
      passwordErrors.passwordMessage = "Password cannot be more than 30 characters";
      passwordErrors.password = true;
    }
    if (password !== confirmpassword) {
      passwordErrors.confirmPasswordMessage = "Passwords must match";
      passwordErrors.confirmPassword = true;
    }
    return passwordErrors;
  };

  const validate = (values) => {
    const passerrors = {};
    const newFormErrors = {};
    
    const passwordErrors = checkPassword(values.password, confirmpassword);
    newFormErrors.password = passwordErrors.password;
    newFormErrors.confirmPassword = passwordErrors.confirmPassword;
    if (passwordErrors.passwordMessage) passerrors.password = passwordErrors.passwordMessage;
    if (passwordErrors.confirmPasswordMessage) passerrors.confirmPassword = passwordErrors.confirmPasswordMessage;
    
    if(!values.username){
      newFormErrors.username = true;
      passerrors.username = "Please enter your username";
    }
    if(!values.email){
      newFormErrors.email = true;
      passerrors.email= "Please enter your email";
    }
    if(!values.firstName){
      newFormErrors.firstName = true;
      passerrors.firstName= "Please enter first name"
    }
    if(!values.lastName){
      newFormErrors.lastName = true;
      passerrors.lastName="Please enter last name"
    }
    setFormErrors({...newFormErrors});
    setErrorMessages({...errorMessages, ...passerrors});
    return passerrors;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    validate(userFormData);
    setIsSubmit(true);

    try {
      const passerrors = validate(userFormData);
      if (Object.keys(passerrors).length > 0) {
        throw new Error ("signup form invalid input");
      };
      console.log(userFormData);

      const { data, error } = await signUpUser({
        variables: {
          owner: {
            ...userFormData,
          },
        },
      });

      Auth.login(data.postOwner.token);
      const loggedInOwner = data.postOwner.owner;

      dispatch(
        storeOwner({
          ...loggedInOwner,
        })
      );
      dispatch(toggleLoggedIn(true));
      saveOwner(loggedInOwner);
      navigate("/create-dog");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ padding: 1, marginTop: 3 }}>
            <h1>Sign Up for Bone Buddies</h1>
            <p>Sign up using the form below.</p>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
                maxWidth: '100%',
              }}
              noValidate
              autoComplete="off"
            >
            <TextField
            sx={{ my: 1 }}
              required
              id="outlined-basic"
              label="Username"
              variant="outlined"
              helperText={errorMessages.username}
              name="username"
              onChange={handleInputChange}
              value={userFormData.username}
              error={formErrors.username}
            />
            <TextField
            sx={{ my: 1 }}
              required
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              helperText={errorMessages.firstName}
              name="firstName"
              onChange={handleInputChange}
              value={userFormData.firstName}
              error={formErrors.firstName}
            />
            <TextField
            sx={{ my: 1 }}
              required
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              helperText={errorMessages.lastName}
              name="lastName"
              onChange={handleInputChange}
              value={userFormData.lastName}
              error={formErrors.lastName}

            />
            <TextField
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
              helperText={errorMessages.email}
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              error={formErrors.email}

            />
            <TextField
            sx={{ my: 1 }}
              required
              id="outlined-basic"
              label="Create Password"
              variant="outlined"
              helperText={errorMessages.password}
              name="password"
              type="password"
              onChange={handleInputChange}
              value={userFormData.password}
              error={formErrors.password}
            />
            <TextField
            sx={{ my: 1 }}
              required
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              helperText={errorMessages.confirmPassword}
              name="confirmpassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmpassword}
              error={formErrors.confirmPassword}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <MobileDatePicker
              id="date"
              label="Birthday"
              type="date"
              disableFuture
              value={userFormData.birthday}
              renderInput={(params) => <TextField {...params} sx={{ my: 1 }} />}
              helperText="Please select your birthday."
              name="birthday"
              onChange={(birthday) =>
                setUserFormData({ ...userFormData, birthday })
              }
              style={{ width: '100%' }}
            />
          </Box>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            >
              <Button
                sx={{ my: 2 }}
                variant="contained"
                type="button"
                onClick={handleFormSubmit}
              >
                Sign Up
              </Button>
            </Stack>
          </Paper>
        </Container>
      </LocalizationProvider>
    </div>
  );
}