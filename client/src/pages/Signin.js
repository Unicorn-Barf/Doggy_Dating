import React, { useState } from "react";
import { Container, Grid, Paper, TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
const Signin = () => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  // const [validate] = useState(false);
  const [ loginUser] = useMutation(LOGIN_USER);
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
    const validateEmail = userFormData.email;
    const validatePassword = userFormData.password;
    if (!validateEmail) {
      alert("Please enter your email");
      return;
    } else if (!validatePassword) {
      alert("Please enter your password");
      return;
    }
    try {
      const { data } = await loginUser({ 
        variables: {
          ...userFormData
        },
      });
      Auth.login(data.login.token);
    } catch (error) {
      console.log(error);
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
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={3} sx={{ padding: 5 }}>
            <Grid item>
              <TextField
                type="text"
                name="email"
                fullWidth
                label="Enter your Email"
                placeholder="Email address"
                onChange={handleInputChange}
                value={userFormData.email}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                name="password"
                fullWidth
                label="Enter your password"
                placeholder="password"
                onChange={handleInputChange}
                value={userFormData.password}
                variant="outlined"
              />
              <Grid item>
                <Button
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
