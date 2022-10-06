import React, { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  useFormControl,
} from "@mui/material";
import { useLazyQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
import { GET_ALL_DOGS_BY_OWNER_ID } from "../utils/queries";
import { useDispatch } from "react-redux";
import { storeOwner } from "../slices/ownerSlice";
import { storeDogs, storeCurrentDog } from "../slices/dogSlice";
import {
  saveOwner,
  saveDogArr,
  setCurrentDogIndex,
} from "../utils/localStorage";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState(false);
  const MyFormHelperText = () => {
    const { error } = useFormControl() || {};
    console.log(error);
    const helperText = React.useMemo(() => {
      if (error) {
        return "Invalid credentials!";
      }
      return "";
    }, [error]);
    return <FormHelperText>{helperText}</FormHelperText>;
  };
  const [loginUser] = useMutation(LOGIN_USER);
  const [getDogs, { loading, error, data }] = useLazyQuery(
    GET_ALL_DOGS_BY_OWNER_ID,
    {
      onCompleted: (data) => {
        dispatch(storeCurrentDog({ ...data.getAllDogsByOwner[0] }));
        dispatch(storeDogs(data.getAllDogsByOwner));
        saveDogArr(data.getAllDogsByOwner);
        setCurrentDogIndex(0);
        navigate("/home");
      },
    }
  );

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
    const checkEmail = userFormData.email;
    const checkPassword = userFormData.password;
    if (checkEmail.length === 0 || checkPassword.length === 0) {
      setValidationError(true);
      return;
    }
    try {
      const { data } = await loginUser({
        variables: {
          ...userFormData,
        },
      });

      Auth.login(data.login.token);
      const signedInOwner = data.login.owner;
      // Store Logged In owner in Global State & local storage
      dispatch(
        storeOwner({
          ...signedInOwner,
        })
      );
      saveOwner(signedInOwner);

      if (signedInOwner.dogIds.length > 0) {
        getDogs({
          variables: { ownerId: signedInOwner._id },
        });
      }
    } catch (error) {
      return console.log(error);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="main-container">
      <h1>Sign Into Bone Buddies</h1>
      <p>Enter your email and password to start making friends for your dog.</p>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          style={{ maxHeight: "50vh" }}
        >
          <FormControl error={validationError}>
            <Paper elevation={3} sx={{ padding: 5, marginTop: 3 }}>
              <Grid item>
                <TextField
                  sx={{ my: 1 }}
                  type="text"
                  name="email"
                  // required
                  fullWidth
                  label="Email"
                  placeholder="email address"
                  onChange={handleInputChange}
                  value={userFormData.email}
                  variant="outlined"
                  helperText=""
                  id="outlined-error-helper-text"
                  error={validationError}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  name="password"
                  fullWidth
                  label="Password"
                  // required
                  placeholder="password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                  variant="outlined"
                  error={validationError}
                />
              </Grid>
              <Grid item>
                <Button
                  sx={{ my: 2 }}
                  fullWidth
                  variant="contained"
                  type="button"
                  onClick={handleFormSubmit}
                >
                  Sign In
                </Button>
              </Grid>
              <MyFormHelperText />
            </Paper>
          </FormControl>
        </Grid>
      </Container>
    </div>
  );
};

export default Signin;
