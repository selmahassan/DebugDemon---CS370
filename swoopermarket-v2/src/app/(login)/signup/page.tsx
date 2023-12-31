'use client'

import { Signup_User } from '@/types/user';
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
import { useRouter } from 'next/navigation'

interface NewUserForm {
    email: string;
    password: string;
    rePassword: string;
}

interface errors {
    email: string;
    password: string;
    rePassword: string;
}

export default function SignUp() {
    const [showPassword, setShowPassword] = React.useState(false); // hide/display password
    const [showRePassword, setShowRePassword] = React.useState(false);
    const [newUserForm, setNewUserForm] = React.useState<NewUserForm>({
        email: "",
        password: "",
        rePassword: "",
    })
    const [errors, setErrors] = React.useState<errors>({
        email: "",
        password: "",
        rePassword: "",
    })
    const router = useRouter()

    // Check valid email
    const onChangeEmail = (e: { target: { value: string; }; }) => {
        if (!e.target.value.match(".+@emory\.edu")) {
            setErrors({...errors, email: 'email must end in "@emory.edu"'})
        } else {
            setErrors({...errors, email: ''})
        }
        setNewUserForm({...newUserForm, email: e.target.value});
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Check valid password
    const onChangePassword = (e: { target: { value: string; }; }) => {
        setNewUserForm({...newUserForm, password: e.target.value});
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(!passwordRegex.test(e.target.value)){
          setErrors({...errors, password: 'Passwords must have at least 8 characters, 1 lowercase, 1 uppercase, and 1 number.' })
        } else {
          setErrors({...errors, password: ''})
        }
    };

    const handleClickShowRePassword = () => setShowRePassword((show) => !show);
    const handleMouseDownRePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Check passwords match
    const onChangeRePassword = (e: { target: { value: string; }; }) => {
        setNewUserForm({...newUserForm, rePassword: e.target.value});
        if (e.target.value !== newUserForm.password) {
            setErrors({...errors, rePassword: 'Passwords do not match.' })
        } else {
            setErrors({...errors, rePassword: ''})
        }
    };

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    // Post new user signup on submit, and send validation email
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const user : Signup_User = {
            first_name: data.get('firstName') as string,
            last_name: data.get('lastName') as string,
            email: data.get('email') as string,
            password: data.get('password') as string,
            phone: data.get('phone') as string,
        };

        try {
            const response = await fetch('../api/user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    
            if (response.status === 201) {
                router.push('/login?isSuccess=true');
            } else if (response.status === 500){
                setErrorMessage("Account already exists. Please sign in or use another email address.");
                setOpenError(true);
                setOpenSuccess(false);
            }

        } catch(error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again.');
            setOpenError(false);
            setOpenSuccess(false);
        }
    };

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
                errorMessage={errorMessage}
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
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                />
                </Grid>
                <Grid item xs={12}>
                <FormControl required fullWidth variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
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
                    {errors.password !== "" && (
                        <FormHelperText error id="password-error">
                            {errors.password}
                        </FormHelperText>
                    )}
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl required fullWidth variant="outlined">
                    <InputLabel htmlFor="re-password">Confirm</InputLabel>
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
            {(errors.rePassword || errors.email) ? 
                <Button
                    disabled
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button> : 
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
            }
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
