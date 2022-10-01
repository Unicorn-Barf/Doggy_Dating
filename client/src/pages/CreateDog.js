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
    const [birthday, setBirthday] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [sex, setSex] = React.useState('');
    const [fix, setFix] = React.useState([]);
    const [weight, setWeight] = React.useState('');
    const [size, setSize] = React.useState([]);
    const [personality, setPersonality] = React.useState({
        aggressive: false,
        confident: false,
        outgoing: false,
        adaptable: false,
        insecure: false,
        independent: false,
        laidback: false,
    });

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
            case "Is your dog spayed/neutered?":
                setFix(value);
                break;
            case "Weight":
                setWeight(value);
                break;
            case "Size":
                setSize(value);
                break;
            // case "Tell us about your pet.":
            //     setDescript(value);
            //     break;
        };

        // setBirthday();
        // setSex(newSex);
        // setFix(newFix);
        // setPersonality({
        //     ...personality,
        //     [newPersonality.target.name]: newPersonality.target.checked,
        // });
    };

    const { aggressive, confident, outgoing, adaptable, insecure, independent, laidback } = personality;
    const error = [aggressive, confident, outgoing, adaptable, insecure, independent, laidback].filter((v) => v).length !== 1;

    // const sexes = [
    //     {
    //         value: 'Male',
    //         label: 'Male',
    //     },
    //     {
    //         value: 'Female',
    //         label: 'Female',
    //     },
    // ];

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
                                onChange={(event) => setBirthday(event.target.value)}
                                renderInput={(params) => <TextField {...params} />}
                                helperText="Please select your dog's birthday."
                            />

                            {/* <TextField
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
                            </TextField> */}

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sex}
                                    label="Sex"
                                    onChange={(event) => setSex(event.target.value)}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>

                            <TextField
                                required
                                id="outlined-select-fixed"
                                select
                                label="Is your dog spayed/neutered?"
                                value={fix}
                                onChange={(event) => setFix(event.target.value)}
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
                                                <Checkbox checked={aggressive} onChange={(event) => handleChange(event)} name="aggressive" />
                                            }
                                            label="Aggressive"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={confident} onChange={(event) => handleChange(event)} name="confident" />
                                            }
                                            label="Confident"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={outgoing} onChange={(event) => handleChange(event)} name="outgoing" />
                                            }
                                            label="Outgoing"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={adaptable} onChange={(event) => handleChange(event)} name="adaptable" />
                                            }
                                            label="Adaptable"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={insecure} onChange={(event) => handleChange(event)} name="insecure" />
                                            }
                                            label="Insecure"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={independent} onChange={(event) => handleChange(event)} name="independent" />
                                            }
                                            label="Independent"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={laidback} onChange={(event) => handleChange(event)} name="laidback" />
                                            }
                                            label="Laidback"
                                        />
                                    </FormGroup>
                                    <FormHelperText>Please check all that apply.</FormHelperText>
                                </FormControl>
                            </Box>

                            {/* <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    value={weight}
                                    onChange={handleChange('weight')}
                                    endAdornment={<InputAdornment position="end">lb</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                            </FormControl> */}

                            <TextField
                                required
                                id="outlined-basic"
                                variant="outlined"
                                label="Weight"
                                onChange={(event) => setWeight(event.target.value)}
                                helperText="Please enter your dog's weight in lbs."
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