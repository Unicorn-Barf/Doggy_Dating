import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PetIcon from "@mui/icons-material/Pets";
import Stack from "@mui/material/Stack";

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggleLoggedIn } from '../../slices/ownerSlice';
import { getSavedDogArr, getCurrentDogIndex, setCurrentDogIndex } from '../../utils/localStorage';
import { storeDogs, storeCurrentDog, getDog } from '../../slices/dogSlice';
import { storeOwner } from '../../slices/ownerSlice';
import Auth from '../../utils/auth';
import './navbar.css';

import Home from '../../pages/Home';

// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
    const { _id: myDogId } = getSavedDogArr()[getCurrentDogIndex()] || { _id: null };
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

    const handleClickChange = (event) => {
        const index = event.target.value;
        setCurrentDogIndex(index);
        dispatch(storeCurrentDog(getSavedDogArr()[index]));
        setAnchorEl(null);
    };

    const currentDog = useSelector(getDog);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event) => {
    //   setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // const handleCloseUserMenu = () => {
    //   setAnchorElUser(null);
    // };

    return (
        <AppBar position="static" id="navbar">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PetIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "Chicle",
                            fontWeight: "bold",
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        Bone Buddies
                    </Typography>

                    <PetIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "Chicle",
                            fontWeight: "bold",
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        Bone Buddies
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "right" }}>
                        {/* <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton> */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {Auth.loggedIn()
                                ?
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    <div id="loggedInNav">
                                        <Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/">Home</Link></Button>
                                        <Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to={`/profile/${myDogId}`}>Profile</Link></Button>
                                        <Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/chat">Chat</Link></Button>
                                        <Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/create-dog">Register New Dog</Link></Button>
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
                                        <Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to={`/dog/settings`}>Dog Settings</Link></Button>
                                        <Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/owner/settings">Owner Settings</Link></Button>
                                        <Button color="inherit" onClick={handleLogOut}><Link style={{ textDecoration: "none", /*color: "white"*/ }}>Sign Out</Link></Button>
                                    </div>
                                </Menu>
                                :
                                // <Menu
                                //     id="menu-appbar"
                                //     anchorEl={anchorElNav}
                                //     anchorOrigin={{
                                //         vertical: 'bottom',
                                //         horizontal: 'right',
                                //     }}
                                //     keepMounted
                                //     transformOrigin={{
                                //         vertical: 'top',
                                //         horizontal: 'right',
                                //     }}
                                //     open={Boolean(anchorElNav)}
                                //     onClose={handleCloseNavMenu}
                                //     sx={{
                                //         display: { xs: 'block', md: 'none' },
                                //     }}
                                // >
                                <div id="loggedOutNav">
                                    <Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/">Home</Link></Button>
                                    <Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/sign-in">Sign In</Link></Button>
                                    <Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/sign-up">Sign Up</Link></Button>
                                </div>
                                // </Menu>
                            }
                        </Menu>
                    </Box>

                    {/* Mobile View */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "right" }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {Auth.loggedIn()
                                ?
                                <div id="loggedInNav">
                                    {/* <Stack
                                        direction="column"
                                        spacing={2}
                                        justifyContent="left"
                                    > */}
                                    <MenuItem><Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/">Home</Link></Button></MenuItem>
                                    <MenuItem><Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/chat">Chat</Link></Button></MenuItem>
                                    <MenuItem><Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/create-dog">Register New Dog</Link></Button></MenuItem>
                                    <MenuItem>
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
                                    </MenuItem>
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
                                    <MenuItem><Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to={`/dog/settings`}>Dog Settings</Link></Button></MenuItem>
                                    <MenuItem><Button color="inherit"><Link style={{ textDecoration: "none", /*color: "white"*/ }} to="/owner/settings">Owner Settings</Link></Button></MenuItem>
                                    <MenuItem><Button color="inherit" onClick={handleLogOut}><Link style={{ textDecoration: "none", /*color: "white"*/ }}>Sign Out</Link></Button></MenuItem>
                                    {/* </Stack> */}
                                </div>
                                :
                                <div id="loggedOutNav">
                                    <MenuItem><Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/">Home</Link></Button></MenuItem>
                                    <MenuItem><Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/sign-in">Sign In</Link></Button></MenuItem>
                                    <MenuItem><Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to="/sign-up">Sign Up</Link></Button></MenuItem>
                                </div>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
