import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './navbar.css';
import { useDispatch } from 'react-redux';
import { storeDogs, storeCurrentDog } from '../../slices/dogSlice';
import { storeOwner } from '../../slices/ownerSlice';

const loggedOutPages = ['Home', 'Signin', 'Signup'];
const loggedInPages = ['Home', 'profile/:id', 'create-dog', 'dogs/settings', 'chat', 'SignOut'];

// const dropDownPages = ['SignOut'];

const Navbar = () => {
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogOut = () => {
        dispatch(storeDogs({}));
        dispatch(storeCurrentDog({}));
        dispatch(storeOwner({}));
        Auth.logout();
    }

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    return (
        <AppBar id="navbar" position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Chicle',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bone Buddies
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {Auth.loggedIn()
                                ? loggedInPages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>
                                                {page}
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                ))
                                : loggedOutPages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>
                                                {page}
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>
                    <PetsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bone Buddies
                    </Typography>
                    {Auth.loggedIn() && (
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'end' } }}>
                            {loggedInPages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>
                                        {page}
                                    </Link>
                                </Button>
                            ))}
                            <Button
                                key={page}
                                onClick={handleLogOut}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {/* <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>
                                        {page}
                                    </Link> */}
                            </Button>
                        </Box>
                    )}

                    {/* {Auth.loggedIn() && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open dropDownPages">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {dropDownPages.map((dropDownPage) => (
                                    <MenuItem key={dropDownPage} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{dropDownPage}</Typography>
                                        <Link style={{ textDecoration: "none", color: "white" }} to={`/${dropDownPage}`}>
                                        {dropDownPage}
                                    </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )} */}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
