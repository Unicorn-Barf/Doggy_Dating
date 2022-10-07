import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PetsIcon from '@mui/icons-material/Pets';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './navbar.css';

import { storeDogs, storeCurrentDog } from '../../slices/dogSlice';
import { storeOwner } from '../../slices/ownerSlice';
import Auth from '../../utils/auth';

export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        console.log('Im hit!');
        dispatch(storeDogs([]));
        dispatch(storeCurrentDog({}));
        dispatch(storeOwner({}));
        localStorage.clear();
        Auth.logout();
        navigate('/');
    }

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
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/profile/:dogId">Profile</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/chat">Chat</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/create-dog">Register New Dog</Link></Button>
                            <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/dog/settings/">Dog Settings</Link></Button>
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
