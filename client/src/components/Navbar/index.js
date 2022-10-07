import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import PetsIcon from '@mui/icons-material/Pets';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggleLoggedIn } from '../../slices/ownerSlice';
import { getSavedDogArr, getCurrentDogIndex, setCurrentDogIndex } from '../../utils/localStorage';
import { storeDogs, storeCurrentDog, getDog } from '../../slices/dogSlice';
import { storeOwner } from '../../slices/ownerSlice';
import Auth from '../../utils/auth';
import './navbar.css';

export default function Navbar() {
    const { _id: myDogId, name: myDogName } = getSavedDogArr()[getCurrentDogIndex()] || null;
    const dogArray = getSavedDogArr();
    const currentDogIndex = getCurrentDogIndex();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(storeDogs([]));
        dispatch(storeCurrentDog({}));
        dispatch(storeOwner({}));
        localStorage.clear();
        Auth.logout();
        dispatch(toggleLoggedIn(false));
        navigate('/');
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const handleClickChange = (event) => {
        const index = event.target.value;
        setCurrentDogIndex(index);
        dispatch(storeCurrentDog(getSavedDogArr()[index]));
        setAnchorEl(null);
    };

    const currentDog = useSelector(getDog);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar id="navbar" position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <PetsIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bone Buddies
                    </Typography>

                    {Auth.loggedIn()
                        ?
                        <div id="loggedInNav">
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/">Home</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to={`/profile/${myDogId}`}>Profile</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/chat">Chat</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/create-dog">Register New Dog</Link></Button>
                            <Button
                                color="inherit"
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Switch Dogs
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                // onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {dogArray.map((dog, index) => (
                                    <MenuItem
                                        value={index}
                                        key={dog._id}
                                        onClick={handleClickChange}
                                    >
                                        {dog.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/owner/settings">Owner Settings</Link></Button>
                            <Button color="inherit" onClick={handleLogOut}><Link style={{ textDecoration: "none", color: "white" }}>Sign Out</Link></Button>
                        </div>
                        :
                        <div id="loggedOutNav">
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/">Home</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/sign-in">Sign In</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/sign-up">Sign Up</Link></Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
