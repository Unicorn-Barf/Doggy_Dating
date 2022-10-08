import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import HouseIcon from '@mui/icons-material/House';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Logo from '../../pages/assets/images/bone-buddies-logo-small.png';
import { toggleLoggedIn } from '../../slices/ownerSlice';
import { getSavedDogArr, getCurrentDogIndex, setCurrentDogIndex } from '../../utils/localStorage';
import { storeDogs, storeCurrentDog, getDog } from '../../slices/dogSlice';
import { storeOwner } from '../../slices/ownerSlice';
import Auth from '../../utils/auth';
import './navbar.css';

export default function Navbar() {

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
        // navigate('/dog/settings');
    };

    const currentDog = useSelector(getDog);

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleClose = () => {
        // setAnchorElNav(null);
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" id="navbar">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "caraque-melted, sans-serif",
                            fontWeight: 500,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        <img
                            src={Logo}
                            id="logo"
                            style={{ alignSelf: "center", width: "50%", marginTop: 5, marginBottom: 5 }}
                            alt="Bone Buddies logo"
                        ></img>
                    </Typography>

                    {/* <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "caraque-melted, sans-serif",
                            fontWeight: 500,
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        <img
                            src={Logo}
                            id="logo"
                            style={{ alignSelf: "center", width: "50%", marginTop: 5, marginBottom: 5 }}
                            alt="Bone Buddies logo"
                        ></img>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "right" }}>
                        {Auth.loggedIn()
                            ?
                            <div id="loggedInNav">
                                <Button color="inherit" ><Link style={{ textDecoration: "none", color: "white" }} to="/" onClose={handleClose}>Home</Link></Button>
                                <Button color="inherit" onClose={handleClose}><Link style={{ textDecoration: "none", color: "white" }} to={`/profile/${myDogId}`}>Profile</Link></Button>
                                <Button color="inherit" onClose={handleClose}><Link style={{ textDecoration: "none", color: "white" }} to="/chat">Chat</Link></Button>
                                <Button color="inherit" onClose={handleClose}><Link style={{ textDecoration: "none", color: "white" }} to="/create-dog">Register New Dog</Link></Button>
                                <Button
                                    color="inherit"
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    onClose={handleClose}
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
                                <Button color="inherit"><Link style={{ textDecoration: "none", color: "white" }} to={`/dog/settings`}>Dog Settings</Link></Button>
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
                    </Box>

                    {/* Mobile Menu */}
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
                            onClose={handleClose}
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
                                    onClose={handleClose}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    <div id="loggedInNav">
                                        <MenuItem className="mobileMenuItem"><Button color="inherit" startIcon={<HouseIcon />}><Link to="/">Home</Link></Button></MenuItem>
                                        <MenuItem className="mobileMenuItem"><Button color="inherit" startIcon={<PetsIcon />}><Link to={`/profile/${myDogId}`}>Profile</Link></Button></MenuItem>
                                        <MenuItem className="mobileMenuItem"><Button color="inherit" startIcon={<ChatIcon />}><Link to="/chat">Chat</Link></Button></MenuItem>
                                        <MenuItem className="mobileMenuItem"><Button color="inherit" startIcon={<AssignmentIcon />}><Link to="/create-dog">Register New Dog</Link></Button></MenuItem>
                                        <MenuItem className="mobileMenuItem"><Button
                                            color="inherit"
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            onClose={handleClose}
                                            startIcon={<CompareArrowsIcon />}
                                        >
                                            Switch Dogs
                                        </Button></MenuItem>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                            onClose={handleClose}
                                        >
                                            {dogArray.map((dog, index) => (
                                                <MenuItem
                                                    value={index}
                                                    key={dog._id}
                                                    onClick={handleClickChange}
                                                    onClose={handleClose}
                                                >
                                                    <Button color="inherit" startIcon={<PetsIcon />}>
                                                        {dog.name}
                                                    </Button>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                        <MenuItem className="mobileMenuItem">
                                            <Button color="inherit" startIcon={<SettingsIcon />}>
                                                <Link to={`/dog/settings`}>Dog Settings</Link>
                                            </Button>
                                        </MenuItem>
                                        <MenuItem className="mobileMenuItem"><Button color="inherit" startIcon={<AccountCircleIcon />}><Link to="/owner/settings">Owner Settings</Link></Button></MenuItem>
                                        <MenuItem className="mobileMenuItem"><Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogOut}><Link>Sign Out</Link></Button></MenuItem>
                                    </div>
                                </Menu>
                                :
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
                                    onClick={handleClick}
                                    onClose={handleClose}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    <div id="loggedOutNav">
                                        <MenuItem className="mobileMenuItem"><Button color="inherit" startIcon={<HouseIcon />} ><Link to="/" onClose={handleClose}>Home</Link></Button></MenuItem>
                                        <MenuItem className="mobileMenuItem"><Button color="inherit" startIcon={<LoginIcon />}><Link to="/sign-in">Sign In</Link></Button></MenuItem>
                                        <MenuItem className="mobileMenuItem"><Button color="inherit" startIcon={<AssignmentIcon />}><Link to="/sign-up">Sign Up</Link></Button></MenuItem>
                                    </div>
                                </Menu>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};