import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';

export default function CreateDog() {
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [sex, setSex] = React.useState([]);
    const [fix, setFix] = React.useState([]);
    const [state, setState] = React.useState({
        aggressive: false,
        confident: false,
        outgoing: false,
        adaptable: false,
        insecure: false,
        independent: false,
        laidback: false,
    });

    const handleChange = (newValue, newSex, newFix, event) => {
        setValue(newValue);
        setSex(newSex);
        setFix(newFix);
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { aggressive, confident, outgoing, adaptable, insecure, independent, laidback } = state;
    const error = [aggressive, confident, outgoing, adaptable, insecure, independent, laidback].filter((v) => v).length !== 1;

    const sexes = [
        {
            value: 'Male',
            label: 'Male',
        },
        {
            value: 'Female',
            label: 'Female',
        },
    ];

    const fixed = [
        {
            value: 'Yes',
            label: 'Yes',
        },
        {
            value: 'No',
            label: 'No',
        },
    ];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                <Container maxWidth="sm">
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        justifyContent="center"
                        style={{ minHeight: "100vh" }}
                    >
                        {/* <p>Sign up using the form below.</p>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
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
                        />
                        <TextField
                            required
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            helperText="Please enter your first name."
                        />
                        <TextField
                            required
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                            helperText="Please enter your last name."
                        />
                        <TextField
                            required
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            helperText="Please enter your email address."
                        />
                        <TextField
                            required
                            id="outlined-basic"
                            label="Create Password"
                            variant="outlined"
                            helperText="Please create a password."
                        />
                        <TextField
                            required
                            id="outlined-basic"
                            label="Confirm Password"
                            variant="outlined"
                            helperText="Please type your password again."
                        />

                    </Box> */}
                        <p>Enter your dog's info.</p>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '100%' },
                                maxWidth: '100%',
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                required
                                id="fullWidth"
                                label="Name"
                                variant="outlined"
                                helperText="Please enter your dog's name."
                            />
                            <MobileDatePicker
                                label="Birthday"
                                id="fullWidth"
                                inputFormat="MM/DD/YYYY"
                                value={value}
                                disableFuture="true"
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                                helperText="Please select your dog's birthday."
                            />
                            <TextField
                                required
                                id="fullWidth"
                                select
                                label="Sex"
                                value={sex}
                                onChange={handleChange}
                                helperText="Please select your dog's sex."
                            >
                                {sexes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                required
                                id="outlined-select-fixed"
                                select
                                label="Is your dog spayed/neutered?"
                                value={fix}
                                onChange={handleChange}
                                helperText="Please select yes or no."
                            >
                                {fixed.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Box sx={{ display: 'flex' }}>
                                <FormControl
                                    required
                                    error={error}
                                    component="fieldset"
                                    // sx={{ m: 3 }}
                                    variant="standard"
                                >
                                    <FormLabel component="legend">Personality</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={aggressive} onChange={handleChange} name="aggressive" />
                                            }
                                            label="Aggressive"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={confident} onChange={handleChange} name="confident" />
                                            }
                                            label="Confident"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={outgoing} onChange={handleChange} name="outgoing" />
                                            }
                                            label="Outgoing"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={adaptable} onChange={handleChange} name="adaptable" />
                                            }
                                            label="Adaptable"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={insecure} onChange={handleChange} name="insecure" />
                                            }
                                            label="Insecure"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={independent} onChange={handleChange} name="independent" />
                                            }
                                            label="Independent"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={laidback} onChange={handleChange} name="laidback" />
                                            }
                                            label="Laidback"
                                        />
                                    </FormGroup>
                                    <FormHelperText>Please check all that apply.</FormHelperText>
                                </FormControl>
                            </Box>

                            <TextField
                                required
                                id="outlined-basic"
                                variant="outlined"
                                label="Weight"
                                helperText="Please enter your dog's weight in lbs."
                                // InputProps={{
                                //     startAdornment: <InputAdornment position="end">lbs</InputAdornment>
                                // }}
                            />

                            <TextField
                                required
                                id="outlined-select-fixed"
                                select
                                label="Size"
                                value={fix}
                                onChange={handleChange}
                                helperText="Please select your dog's general size."
                            />
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <p>Upload your dog's image here.</p>
                                <Button variant="contained" component="label">
                                    Tap/Click to Upload
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Stack>

                            <TextField
                                id="outlined-multiline-static"
                                label="Tell us about your pet."
                                placeholder="Add dog description here."
                                multiline
                                rows={4}
                            />
                            <Stack direction="row" spacing={2}>
                            <Button variant="contained">
                                Submit
                            </Button>
                        </Stack>
                        </Box>

                    </Grid>
                </Container>
            </div>
        </LocalizationProvider>
    );

    // export default function CreateDog() {

}