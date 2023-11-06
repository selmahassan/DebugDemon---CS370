'use client'

import { User } from '@/types';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormHelperText from '@mui/material/FormHelperText';
import StickyAlert from '@/components/StickyAlert';

interface NewUserForm {
    email: string;
    phoneNumber: string;
    password: string;
    rePassword: string;
}

interface errors {
    email: string;
    phoneNumber: string;
    rePassword: string;
}

export default function SignUp() {
    const [showPassword, setShowPassword] = React.useState(false); // hide/display password
    const [showRePassword, setShowRePassword] = React.useState(false); // 
    const [newUserForm, setNewUserForm] = React.useState<NewUserForm>({
        email: "",
        phoneNumber: "",
        password: "",
        rePassword: "",
    })
    const [errors, setErrors] = React.useState<errors>({
        email: "",
        phoneNumber: "",
        rePassword: "",
    })

    const onChangeEmail = (e: { target: { value: string; }; }) => {
        if (!e.target.value.match(".+@emory\.edu")) {
            setErrors({...errors, email: 'Email must end in "@emory.edu"'})
        } else {
            setErrors({...errors, email: ''})
        }
        setNewUserForm({...newUserForm, email: e.target.value});
    };

    const onChangePhoneNumber = (e: { target: { value: string; }; }) => {
        if (!e.target.value.match(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/)) {
            setErrors({...errors, phoneNumber: 'Phone number must be valid'})
        } else {
            setErrors({...errors, phoneNumber: ''})
        }
        setNewUserForm({...newUserForm, phoneNumber: e.target.value});
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onChangePassword = (e: { target: { value: string; }; }) => {
        setNewUserForm({...newUserForm, password: e.target.value});
    };

    const handleClickShowRePassword = () => setShowRePassword((show) => !show);
    const handleMouseDownRePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onChangeRePassword = (e: { target: { value: string; }; }) => {
        setNewUserForm({...newUserForm, rePassword: e.target.value});
        if (e.target.value !== newUserForm.password) {
            setErrors({...errors, rePassword: 'Passwords Do Not Match' })
        } else {
            setErrors({...errors, rePassword: ''})
        }
    };

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        // TODO : how are we generating user's unique user ids? are we making them choose one or will we make one based off of database
        const user : User = {
            userid: data.get('firstName') as string,
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            email: data.get('email') as string,
            phoneNumber: data.get('phoneNumber') as string,
            password: data.get('password') as string,
            bio: data.get('bio') as string,
        };

        console.log(user);
        fetch('../api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        // TODO: need to check if account already exists
        setOpenSuccess(true);
        setOpenError(false);

        //TODO: show error if account already exists
        // setOpenSuccess(false);
        // setOpenError(true);

    };

    // Check if all fields are filled
    const areAllFieldsFilled = () => {
        return (
            newUserForm.email &&
            newUserForm.phoneNumber &&
            newUserForm.password &&
            newUserForm.rePassword
        );
    };

  // @ts-ignore
    return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <StickyAlert
              successMessage="Account signup successful! Please sign in."
              errorMessage="Account already exists. Please sign in."
              openSuccess={openSuccess}
              setOpenSuccess={setOpenSuccess}
              openError={openError}
              setOpenError={setOpenError}
            />
            <Typography component="h1" variant="h5">
            SwooperMarket Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={errors.email !== ""}
                    helperText={errors.email}
                    value={newUserForm.email || ''}
                    onChange={ onChangeEmail }
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="tel"
                    error={errors.phoneNumber !== ""}
                    helperText={errors.phoneNumber}
                    value={newUserForm.phoneNumber || ''}
                    onChange={onChangePhoneNumber}
                />
                </Grid>
                <Grid item xs={12}>
                <FormControl required fullWidth variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        required
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        value={newUserForm.password || ''}
                        onChange={ onChangePassword }
                    />
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl required fullWidth variant="outlined">
                    <InputLabel htmlFor="re-password">Re-Enter Password</InputLabel>
                    <OutlinedInput
                        id="rePassword"
                        name="rePassword"
                        type={showRePassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowRePassword}
                            onMouseDown={handleMouseDownRePassword}
                            edge="end"
                            >
                            {showRePassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="rePassword"
                        value={newUserForm.rePassword || ''}
                        onChange={ onChangeRePassword }
                        error={errors.rePassword !== ""}
                    />
                    {errors.rePassword !== "" && (
                        <FormHelperText error id="rePassword-error">
                            {errors.rePassword}
                        </FormHelperText>
                    )}
                </FormControl>
                </Grid>
            </Grid>
                <Button
                    type="submit"
                    disabled={!!errors.rePassword || !!errors.email || !areAllFieldsFilled()}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                <Link href="/login" style={{ textDecoration:"none" }}>
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
    </Container>
  );
}
