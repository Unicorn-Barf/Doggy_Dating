import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
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
    const [name, setName] = React.useState('');
    const [birthday, setBirthday] = React.useState(dayjs('2014-08-18'));
    const [sex, setSex] = React.useState('');
    const [fix, setFix] = React.useState([]);
    const [weight, setWeight] = React.useState('');
    const [size, setSize] = React.useState([]);
    const [personality, setPersonality] = React.useState([]);
    const [descript, setDescript] = React.useState([]);

    const handleChange = (event) => {
        const { label, value } = event.target;
        switch (label) {
            case "Name":
                setName(value);
                break;
            case "Birthday":
                setBirthday(value);
                break;
            case "Sex":
                setSex(value);
                break;
            case "Fix":
                setFix(value);
                break;
            case "Weight":
                setWeight(value);
                break;
            case "Size":
                setSize(value);
                break;
            case "Personality":
                setPersonality(
                    typeof value === 'string' ? value.split(',') : value,
                );
                break;
            case "Tell us about your pet.":
                setDescript(value);
                break;
        };

        // setBirthday();
        // setSex(newSex);
        // setFix(newFix);
        // setPersonality({
        //     ...personality,
        //     [newPersonality.target.name]: newPersonality.target.checked,
        // });
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const personalities = [
        'Aggressive',
        'Confident',
        'Outgoing',
        'Adaptable',
        'Insecure',
        'Independent',
        'Laid Back',

    ];

    const sizes = [
        {
            value: 'XX-Small',
            label: 'XX-Small (Fewer than 5 lbs)',
        },
        {
            value: 'X-Small',
            label: 'X-Small (5-12 lbs)',
        },
        {
            value: 'Small',
            label: 'Small (13-24 lbs)',
        },
        {
            value: 'Medium',
            label: 'Medium (25-59 lbs)',
        },
        {
            value: 'Large',
            label: 'Large (60-99 lbs)',
        },
        {
            value: 'X-Large',
            label: 'X-Large (101 lbs or more)',
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
                        <h2>Register a Dog</h2>
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
                                value={birthday}
                                disableFuture
                                onChange={(newBirthday) => setBirthday(newBirthday)}
                                renderInput={(params) => <TextField {...params} helperText="Please select your dog's birthday." />}
                            />

                            <FormControl required>
                                <InputLabel id="simple-select-label">Sex</InputLabel>
                                <Select
                                    required
                                    // labelId="demo-simple-select-label"
                                    id="simple-select"
                                    value={sex}
                                    label="Sex"
                                    onChange={(event) => setSex(event.target.value)}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                </Select>
                                <FormHelperText>Please select your dog's sex.</FormHelperText>
                            </FormControl>

                            <FormControl required>
                                <InputLabel id="simple-select-label">Spayed/neutered?</InputLabel>
                                <Select
                                    required
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={fix}
                                    label="Fix"
                                    onChange={(event) => setFix(event.target.value)}
                                >
                                    <MenuItem value={'Yes'}>Yes</MenuItem>
                                    <MenuItem value={'No'}>No</MenuItem>
                                </Select>
                                <FormHelperText>Is your dog spayed/neutered?</FormHelperText>
                            </FormControl>

                            <Box sx={{ display: 'flex' }}>
                                <FormControl
                                    required
                                    sx={{ width: "100%" }}
                                >
                                    <InputLabel id="multiple-checkbox-label">Personality</InputLabel>
                                    <Select
                                        labelId="multiple-checkbox-label"
                                        id="multiple-checkbox"
                                        multiple
                                        value={personality}
                                        onChange={(event) => setPersonality(event.target.value)}
                                        input={<OutlinedInput label="Personality" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {personalities.map((personality) => (
                                            <MenuItem key={personality} value={personality}>
                                                <Checkbox unchecked={personality.indexOf(personality) > -1} />
                                                <ListItemText primary={personality} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Please check all that apply.</FormHelperText>
                                </FormControl>
                            </Box>

                            <TextField
                                required
                                id="outlined-basic"
                                variant="outlined"
                                label="Weight"
                                onChange={(event) => setWeight(event.target.value)}
                                helperText="Please enter your dog's weight."
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">lbs</InputAdornment>
                                }}
                            />

                            <TextField
                                required
                                id="fullWidth"
                                select
                                label="Size"
                                value={size}
                                onChange={(event) => setSize(event.target.value)}
                                helperText="Please select your dog's general size."
                            >
                                {sizes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {/* <TextField
                                required
                                id="outlined-select-fixed"
                                select
                                label="Size"
                                value={fix}
                                onChange={handleChange}
                                helperText="Please select your dog's general size."
                            /> */}
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
}