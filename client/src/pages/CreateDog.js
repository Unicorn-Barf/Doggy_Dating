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

    const handleChange = (newValue, newSex) => {
        setValue(newValue);
        setSex(newSex);
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
    ]

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
                        label="Create Username"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-basic"
                        label="First Name"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-basic"
                        label="Create Password"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-basic"
                        label="Confirm Password"
                        variant="outlined"
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
                    />
                    <MobileDatePicker
                        label="Birthday"
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
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

                </Box>
            </div>
        </LocalizationProvider>
    );

    // export default function CreateDog() {

}