import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import '../styles/root.css';
import './styles/pages.css';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_DOG } from '../utils/mutations';
import { useDispatch } from 'react-redux';
import Auth from '../utils/auth';
import { pushDogToArr } from '../utils/localStorage';

export default function CreateDog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createDog] = useMutation(CREATE_DOG);

    const [name, setName] = React.useState('');
    const [birthday, setBirthday] = React.useState(dayjs('2014-08-18'));
    const [sex, setSex] = React.useState('');
    const [fix, setFix] = React.useState([]);
    const [weight, setWeight] = React.useState('');
    const [size, setSize] = React.useState([]);
    const [personality, setPersonality] = React.useState([]);
    const [descript, setDescript] = React.useState([]);
    const ownerId = Auth.getProfile().data._id;
    const [dogFormData, setDogFormData] = React.useState({
        name: '',
        breed: '',
        birthday: '08/14/2014',
        sex: '',
        isFixed: '',
        weight: 0,
        // personality: [],
        about: '',
        // images: [],
        tags: [],
    });

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

    const handlePersonalityChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonality(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setDogFormData({
            ...dogFormData,
            [name]: value,
        })
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createDog({
                variables: {
                    dog: { ...dogFormData, ownerId, personality, weight: parseInt(dogFormData.weight) }
                }
            });
            console.log(data);
            pushDogToArr(data.postDog);
            navigate(`/profile/${data.postDog._id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='main-container'>
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{ padding: 1, marginTop: 3 }}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            justifyContent="center"
                            style={{ minHeight: "100vh" }}
                        >
                            <h1>Register a New Dog</h1>
                            <p>Enter your dog's info.</p>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { width: '100%' },
                                    maxWidth: '100%',
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    sx={{ my: 1 }}
                                    required
                                    id="fullWidth"
                                    label="Name"
                                    value={dogFormData.name}
                                    name="name"
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    helperText="Please enter your dog's name."
                                />
                                <TextField
                                    sx={{ my: 1 }}
                                    required
                                    id="fullWidth"
                                    label="Breed"
                                    value={dogFormData.breed}
                                    name="breed"
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    helperText="What is/are your dog's breed(s)?"
                                />
                                <MobileDatePicker
                                    label="Birthday"
                                    id="fullWidth"
                                    inputFormat="MM/DD/YYYY"
                                    value={dogFormData.birthday}
                                    name="birthday"
                                    disableFuture
                                    onChange={(birthday) => setDogFormData({ ...dogFormData, birthday })}
                                    renderInput={(params) => <TextField {...params} helperText="Please select your dog's birthday." sx={{ my: 1 }} />}
                                />

                                <FormControl required sx={{ width: '100%', my: 1 }}>
                                    <InputLabel className="simple-select-label">Sex</InputLabel>
                                    <Select
                                        sx={{ my: 1 }}
                                        id="simple-select"
                                        value={dogFormData.sex}
                                        name="sex"
                                        label="Sex"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={'Male'}>Male</MenuItem>
                                        <MenuItem value={'Female'}>Female</MenuItem>
                                    </Select>
                                    <FormHelperText>Please select your dog's sex.</FormHelperText>
                                </FormControl>

                                <FormControl required sx={{ width: '100%', my: 1 }}>
                                    <InputLabel className="simple-select-label">Spayed or Neutered?</InputLabel>
                                    <Select
                                        id="simple-select"
                                        value={dogFormData.isFixed}
                                        name="isFixed"
                                        label="Fix"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                    <FormHelperText>Is your dog spayed/neutered?</FormHelperText>
                                </FormControl>

                                <FormControl required sx={{ width: '100%', my: 1 }}>
                                    <InputLabel id="multiple-checkbox-label">Personality Traits</InputLabel>
                                    <Select
                                        labelId="multiple-checkbox-label"
                                        id="multiple-checkbox"
                                        multiple
                                        label="Personality"
                                        value={personality}
                                        name="personality"
                                        onChange={handlePersonalityChange}
                                        input={<OutlinedInput label="Personality" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {personalities.map((traits) => (
                                            <MenuItem key={traits} value={traits}>
                                                <Checkbox checked={personality.indexOf(traits) > -1} />
                                                <ListItemText primary={traits} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Please select all that apply.</FormHelperText>
                                </FormControl>

                                <TextField
                                    sx={{ my: 1 }}
                                    required
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="Weight"
                                    value={dogFormData.weight}
                                    name="weight"
                                    onChange={handleInputChange}
                                    helperText="Please enter your dog's weight."
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">lbs</InputAdornment>
                                    }}
                                />
                            </Box>

                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { width: '100%' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                {/* FOR FUTURE DEVELOPMENT
                                <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                justifyContent="center"
                            >
                                <p>Upload your dog's image here.</p>
                                <Button variant="contained" component="label">
                                    Tap/Click to Upload
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Stack> */}

                                <TextField
                                    id="outlined-multiline-static"
                                    label="Tell us about your pet."
                                    value={dogFormData.about}
                                    name="about"
                                    placeholder="Add your dog's description here."
                                    multiline
                                    rows={4}
                                    onChange={handleInputChange}
                                />
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Button
                                        sx={{ my: 1 }}
                                        variant="contained"
                                        onClick={handleFormSubmit}
                                    >
                                        Register Dog
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Paper>
                </Container>
            </div >
        </LocalizationProvider >
    );
}