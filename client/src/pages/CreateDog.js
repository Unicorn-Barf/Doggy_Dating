import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import MenuItem from '@mui/material/MenuItem';

export default function CreateDog() {
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [sex, setSex] = React.useState([]);
    const [fix, setFix] = React.useState([]);

    const handleChange = (newValue, newSex, newFix) => {
        setValue(newValue);
        setSex(newSex);
        setFix(newFix);
    };

    const sexes = [
        {
            value: 'Male',
            label: 'Male',
        },
        {
            value: 'Female',
            label: 'Female',
        },
        // {
        //     value: 'Prefer Not to Say',
        //     label: 'Prefer Not to Say',
        // },
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
                <p>Sign up using the form below.</p>
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

                </Box>
                <p>Enter your dog's info.</p>
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
                        label="Name"
                        variant="outlined"
                        helperText="Please enter your dog's name."
                    />
                    <MobileDatePicker
                        label="Birthday"
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                        helperText="Please select your dog's birthday. 🎂"
                    />
                    <TextField
                        required
                        id="outlined-select-sex"
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
                        value={fixed}
                        onChange={handleChange}
                        helperText="Please select yes or no."
                    >
                        {fixed.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                </Box>
            </div>
        </LocalizationProvider>
    );

    // export default function CreateDog() {

}