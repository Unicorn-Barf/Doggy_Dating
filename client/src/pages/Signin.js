import React, { useState } from "react";
import { Container, Grid, Paper, TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const dispatch = useDispatch();
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const [loginUser] = useMutation(LOGIN_USER);
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData, //access the properties which is email and password
      [name]: value, //
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    // const checkEmail = userFormData.email;
    // const checkPassword = userFormData.password;
    // if (!checkEmail || !checkPassword) {
    //   alert("Please enter your email and password");
    //   return;
    // } else if (checkEmail === null) {
    //   alert("Please enter your email");
    // } else if (checkPassword === null) {
    //   alert("Please enter your password");
    // }
    // return;
    try {
      const { data } = await loginUser({
        variables: {
          ...userFormData,
        },
      });
      Auth.login(data.login.token);
      const signUpOwner = data.postOwner.owner;
      console.log(signUpOwner);
      dispatch({
        ...signUpOwner,
      });
    } catch (error) {
      return console.log(error);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={3} sx={{ padding: 5 }}>
            <Grid item>
              <TextField
                sx={{ my: 1 }}
                type="text"
                name="email"
                fullWidth
                label="Email"
                placeholder="username or email address"
                onChange={handleInputChange}
                value={userFormData.email}
                variant="outlined"
                helperText="Incorrect entry."
                id="outlined-error-helper-text"
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                name="password"
                fullWidth
                label="Password"
                placeholder="password"
                onChange={handleInputChange}
                value={userFormData.password}
                variant="outlined"
              />
              <Grid item>
                <Button
                  sx={{ my: 2 }}
                  fullWidth
                  variant="contained"
                  type="button"
                  onClick={handleFormSubmit}
                >
                  SignIn
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default Signin;
